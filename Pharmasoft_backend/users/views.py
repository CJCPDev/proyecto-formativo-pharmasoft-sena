# ─────────────────────────────────────────────
# users/views.py
# Vistas del módulo de usuarios
# Maneja las peticiones HTTP para usuarios y permisos
# ─────────────────────────────────────────────

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.conf import settings
from .models import Usuarios, TipoDocumento, Roles, Permisos, RolPermisos, UsuarioPermisos, CarritoCompra
from .serializers import (
    UsuarioSerializer,
    TipoDocumentoSerializer,
    RolSerializer,
    PermisoSerializer,
    RolPermisoSerializer,
    UsuarioPermisoSerializer,
    CarritoCompraSerializer
)
import os
import re


class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer

    # Permite filtrar usuarios por número de documento o por rol
    def get_queryset(self):
        queryset = Usuarios.objects.select_related(
            'id_documento',
            'id_rol',
            'id_estado_usuario'
        ).all()

        # Filtra por número de documento si viene en la URL
        documento = self.request.query_params.get('documento')
        if documento:
            queryset = queryset.filter(numero_documento=documento)

        # Filtra por rol si viene en la URL
        # El farmaceuta usa esto para ver solo clientes
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

# Endpoint para cambiar la contraseña del usuario
@api_view(['POST'])
def cambiar_contrasena(request, pk):
    try:
        usuario = Usuarios.objects.get(pk=pk)
    except Usuarios.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    contrasena_actual = request.data.get('contrasena_actual')
    nueva_contrasena = request.data.get('nueva_contrasena')
    confirmar_contrasena = request.data.get('confirmar_contrasena')

    # Verificamos que todos los campos estén presentes
    if not contrasena_actual or not nueva_contrasena or not confirmar_contrasena:
        return Response(
            {'error': 'Todos los campos son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Verificamos que la nueva contraseña y la confirmación coincidan
    if nueva_contrasena != confirmar_contrasena:
        return Response(
            {'error': 'Las contraseñas no coinciden'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Verificamos la contraseña actual
    from .auth import verificar_contrasena, encriptar_contrasena
    if usuario.contrasena:
        if not verificar_contrasena(contrasena_actual, usuario.contrasena):
            return Response(
                {'error': 'La contraseña actual es incorrecta'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    else:
        # Si no tiene contraseña usa el número de documento
        if usuario.numero_documento != int(contrasena_actual):
            return Response(
                {'error': 'La contraseña actual es incorrecta'},
                status=status.HTTP_401_UNAUTHORIZED
            )

    # Encriptamos y guardamos la nueva contraseña
    usuario.contrasena = encriptar_contrasena(nueva_contrasena)
    usuario.save()

    return Response(
        {'message': 'Contraseña actualizada correctamente'},
        status=status.HTTP_200_OK
    )

# Endpoints del carrito de compras

# Obtiene todos los items del carrito de un usuario
@api_view(['GET'])
def obtener_carrito(request, id_usuario):
    items = CarritoCompra.objects.filter(
        id_usuario=id_usuario,
        estado='activo'
    )
    serializer = CarritoCompraSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Agrega un producto al carrito
@api_view(['POST'])
def agregar_al_carrito(request):
    id_usuario = request.data.get('id_usuario')
    id_medicamento = request.data.get('id_medicamento')
    cantidad = request.data.get('cantidad', 1)
    precio_unitario = request.data.get('precio_unitario')
    estado = request.data.get('estado', 'activo')  #nuevo campo

    if not id_usuario or not id_medicamento or not precio_unitario:
        return Response(
            {'error': 'id_usuario, id_medicamento y precio_unitario son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Verificamos si el producto ya está en el carrito con el mismo estado
    item_existente = CarritoCompra.objects.filter(
        id_usuario=id_usuario,
        id_medicamento=id_medicamento,
        estado=estado  #filtramos por el estado actual
    ).first()

    if item_existente:
        item_existente.cantidad += int(cantidad)
        item_existente.subtotal = item_existente.cantidad * float(precio_unitario)
        item_existente.save()
        serializer = CarritoCompraSerializer(item_existente)
    else:
        subtotal = int(cantidad) * float(precio_unitario)
        item = CarritoCompra.objects.create(
            id_usuario_id=id_usuario,
            id_medicamento=id_medicamento,
            cantidad=cantidad,
            precio_unitario=precio_unitario,
            subtotal=subtotal,
            estado=estado  #usamos el estado recibido
        )
        serializer = CarritoCompraSerializer(item)

    return Response(serializer.data, status=status.HTTP_201_CREATED)

# Actualiza la cantidad de un item del carrito
@api_view(['PATCH'])
def actualizar_cantidad(request, id_carrito):
    try:
        item = CarritoCompra.objects.get(pk=id_carrito)
    except CarritoCompra.DoesNotExist:
        return Response({'error': 'Item no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    cantidad = request.data.get('cantidad')
    if not cantidad or int(cantidad) < 1:
        return Response({'Erro':  'Cantidad inválida'}, status=status.HTTP_400_BAD_REQUEST)
    
    item.cantidad = int(cantidad)
    item.subtotal = item.cantidad * float(item.precio_unitario)
    item.save()

    serializer = CarritoCompraSerializer(item)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Elimina un item del carrito
@api_view(['DELETE'])
def eliminar_del_carrito(request, id_carrito):
    try:
        item = CarritoCompra.objects.get(pk=id_carrito)
    except CarritoCompra.DoesNotExist:
        return Response({'error': 'item no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    item.delete()
    return Response({'message': 'Producto eliminado del carrito'}, status=status.HTTP_200_OK)

# Vacia el carrito de un usuario
@api_view(['DELETE'])
def vaciar_carrito(request, id_usuario):
    CarritoCompra.objects.filter(
        id_usuario=id_usuario,
        estado='activo'
    ).delete()
    return Response({'message': 'Carrito vaciado correctamente'}, status=status.HTTP_200_OK)

# Obtiene todos los carritos - solo los administradores
@api_view(['GET'])
def obtener_todos_los_carritos(request):
    # Agrupamos los items por usuario
    from django.db.models import Sum, Count
    
    items = CarritoCompra.objects.select_related('id_usuario', 'aprobado_por').all()
    
    # Agrupamos por usuario y estado
    carritos_agrupados = {}
    for item in items:
        key = f"{item.id_usuario_id}_{item.estado}"
        if key not in carritos_agrupados:
            usuario = item.id_usuario
            aprobado = item.aprobado_por
            carritos_agrupados[key] = {
                'id_carrito': item.id_carrito,
                'id_usuario': item.id_usuario_id,
                'nombre_cliente': f"{usuario.nombres} {usuario.apellidos}",
                'documento_cliente': str(usuario.numero_documento),
                'estado': item.estado,
                'id_factura': item.id_factura,
                'nombre_aprobado_por': f"{aprobado.nombres} {aprobado.apellidos}" if aprobado else "Sin aprobar",
                'total': float(item.subtotal),
                'items': []
            }
        else:
            carritos_agrupados[key]['total'] += float(item.subtotal)
        
        carritos_agrupados[key]['items'].append({
            'id_carrito': item.id_carrito,
            'id_medicamento': item.id_medicamento,
            'nombre_medicamento': f"Medicamento #{item.id_medicamento}",
            'cantidad': item.cantidad,
            'precio_unitario': float(item.precio_unitario),
            'subtotal': float(item.subtotal),
        })

    return Response(list(carritos_agrupados.values()), status=status.HTTP_200_OK)

# Obtiene el detalle de un carrito por ID
@api_view(['GET'])
def obtener_carrito_detalle(request, id_carrito):
    try:
        # Buscamos el item para obtener el id_usuario
        item = CarritoCompra.objects.select_related('id_usuario', 'aprobado_por').get(pk=id_carrito)
        
        # Traemos todos los items del mismo usuario con el mismo estado
        items = CarritoCompra.objects.filter(
            id_usuario=item.id_usuario_id,
            estado=item.estado
        )

        usuario = item.id_usuario
        aprobado = item.aprobado_por

        detalle = {
            'id_carrito': item.id_carrito,
            'id_usuario': item.id_usuario_id,
            'nombre_cliente': f"{usuario.nombres} {usuario.apellidos}",
            'estado': item.estado,
            'id_factura': item.id_factura,
            'nombre_aprobado_por': f"{aprobado.nombres} {aprobado.apellidos}" if aprobado else "Sin aprobar",
            'items': []
        }

        for i in items:
            detalle['items'].append({
                'id_carrito': i.id_carrito,
                'id_medicamento': i.id_medicamento,
                'nombre_medicamento': f"Medicamento #{i.id_medicamento}",
                'cantidad': i.cantidad,
                'precio_unitario': float(i.precio_unitario),
                'subtotal': float(i.subtotal),
                'estado': i.estado,
            })

        detalle['total'] = sum(i['subtotal'] for i in detalle['items'])

        return Response(detalle, status=status.HTTP_200_OK)
    except CarritoCompra.DoesNotExist:
        return Response({'error': 'Carrito no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
# Actualiza el estado y factura del carrito
@api_view(['PATCH'])
def actualizar_carrito(request, id_carrito):
    try:
        item = CarritoCompra.objects.get(pk=id_carrito)
    except CarritoCompra.DoesNotExist:
        return Response({'error': 'Carrito no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    estado = request.data.get('estado')
    id_factura = request.data.get('id_factura')
    aprobado_por = request.data.get('aprobado_por')

    if estado:
        item.estado = estado
    if id_factura:
        item.id_factura = id_factura
    if aprobado_por:
        item.aprobado_por_id = aprobado_por

    item.save()
    serializer = CarritoCompraSerializer(item)
    return Response(serializer.data, status=status.HTTP_200_OK)