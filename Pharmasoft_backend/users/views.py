# ─────────────────────────────────────────────
# users/views.py
# Vistas del módulo de usuarios
# Maneja las peticiones HTTP para usuarios y permisos
# ─────────────────────────────────────────────

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.conf import settings
from .models import Usuarios, TipoDocumento, Roles, Permisos, RolPermisos, UsuarioPermisos
from .serializers import (
    UsuarioSerializer,
    TipoDocumentoSerializer,
    RolSerializer,
    PermisoSerializer,
    RolPermisoSerializer,
    UsuarioPermisoSerializer
)
import os
import re


class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer

    # Permite filtrar usuarios por número de documento
    def get_queryset(self):
        queryset = Usuarios.objects.select_related(
            'id_documento',
            'id_rol',
            'id_estado_usuario'
        ).all()
        # Filtra por número de documento si viene en la URl
        documento = self.request.query_params.get('documento')
        if documento:
            queryset = queryset.filter(numero_documento=documento)

        rol = self.request.query_params.get('rol')
        if rol:
            queryset = queryset.filter(id_rol=rol)
        return queryset

    # Muestra errores detallados al crear un usuario
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Vista para tipos de documento — solo lectura
class TipoDocumentoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoDocumentoSerializer


# Vista para roles — solo lectura
class RolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolSerializer


# Vista para permisos disponibles — solo lectura
class PermisoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Permisos.objects.all()
    serializer_class = PermisoSerializer


# Vista para permisos de un rol
class RolPermisoViewSet(viewsets.ModelViewSet):
    queryset = RolPermisos.objects.select_related('id_permiso').all()
    serializer_class = RolPermisoSerializer

    def get_queryset(self):
        queryset = RolPermisos.objects.select_related('id_permiso').all()
        rol = self.request.query_params.get('rol')
        if rol:
            queryset = queryset.filter(id_rol=rol)
        return queryset

    # Guarda todos los permisos de un rol de una sola vez
    @action(detail=False, methods=['post'])
    def guardar_permisos(self, request):
        id_rol = request.data.get('id_rol')
        permisos = request.data.get('permisos', [])
        if not id_rol:
            return Response({'error': 'id_rol es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        RolPermisos.objects.filter(id_rol=id_rol).delete()
        for id_permiso in permisos:
            RolPermisos.objects.create(id_rol_id=id_rol, id_permiso_id=id_permiso)
        return Response({'message': 'Permisos guardados correctamente'}, status=status.HTTP_200_OK)


# Vista para permisos de un usuario individual
class UsuarioPermisoViewSet(viewsets.ModelViewSet):
    queryset = UsuarioPermisos.objects.select_related('id_permiso').all()
    serializer_class = UsuarioPermisoSerializer

    def get_queryset(self):
        queryset = UsuarioPermisos.objects.select_related('id_permiso').all()
        usuario = self.request.query_params.get('usuario')
        if usuario:
            queryset = queryset.filter(id_usuario=usuario)
        return queryset

    # Guarda todos los permisos de un usuario de una sola vez
    @action(detail=False, methods=['post'])
    def guardar_permisos(self, request):
        id_usuario = request.data.get('id_usuario')
        permisos = request.data.get('permisos', [])
        if not id_usuario:
            return Response({'error': 'id_usuario es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        UsuarioPermisos.objects.filter(id_usuario=id_usuario).delete()
        for id_permiso in permisos:
            UsuarioPermisos.objects.create(id_usuario_id=id_usuario, id_permiso_id=id_permiso)
        return Response({'message': 'Permisos guardados correctamente'}, status=status.HTTP_200_OK)


# Endpoint para subir imágenes de avatares
@api_view(['POST'])
def subir_avatar(request):
    if 'avatar' not in request.FILES:
        return Response({'error': 'No se envió ningún archivo'}, status=status.HTTP_400_BAD_REQUEST)
    archivo = request.FILES['avatar']
    nombre_limpio = re.sub(r'[^\w\.]', '_', archivo.name)
    carpeta = os.path.join(settings.MEDIA_ROOT, 'avatars')
    os.makedirs(carpeta, exist_ok=True)
    ruta = os.path.join(carpeta, nombre_limpio)
    with open(ruta, 'wb+') as destino:
        for chunk in archivo.chunks():
            destino.write(chunk)
    url = f"{settings.MEDIA_URL}avatars/{nombre_limpio}"
    return Response({'url': url}, status=status.HTTP_200_OK)


# Endpoint para cambiar el estado de un usuario
@api_view(['PATCH'])
def cambiar_estado_usuario(request, pk):
    try:
        usuario = Usuarios.objects.get(pk=pk)
    except Usuarios.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    id_estado = request.data.get('id_estado_usuario')
    if not id_estado:
        return Response({'error': 'id_estado_usuario es requerido'}, status=status.HTTP_400_BAD_REQUEST)
    usuario.id_estado_usuario_id = id_estado
    usuario.save()
    return Response({'message': 'Estado actualizado correctamente'}, status=status.HTTP_200_OK)


# Endpoint para obtener permisos combinados de un usuario (rol + extras)
@api_view(['GET'])
def permisos_usuario_combinados(request, pk):
    try:
        usuario = Usuarios.objects.get(pk=pk)
    except Usuarios.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    permisos_rol = RolPermisos.objects.filter(
        id_rol=usuario.id_rol_id
    ).values_list('id_permiso_id', flat=True)
    permisos_extra = UsuarioPermisos.objects.filter(
        id_usuario=pk
    ).values_list('id_permiso_id', flat=True)
    ids_combinados = set(list(permisos_rol) + list(permisos_extra))
    permisos = Permisos.objects.filter(id_permiso__in=ids_combinados)
    serializer = PermisoSerializer(permisos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)