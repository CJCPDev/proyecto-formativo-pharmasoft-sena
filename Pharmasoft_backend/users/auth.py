# ─────────────────────────────────────────────
# users/auth.py
# Maneja la autenticación de usuarios con JWT
# Verifica credenciales y devuelve tokens
# Usa bcrypt para encriptar contraseñas
# ─────────────────────────────────────────────

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Usuarios
from datetime import datetime, timedelta, timezone
import bcrypt


def get_tokens_for_user(usuario):
    """Genera los tokens JWT para un usuario"""
    refresh = RefreshToken()
    refresh['id'] = usuario.id_tipo_usuario
    refresh['nombre'] = f"{usuario.nombres} {usuario.apellidos}"
    refresh['rol'] = usuario.id_rol_id
    refresh['email'] = usuario.correo_electronico

    # Tiempo de sesión según el rol
    tiempos_por_rol = {
        5: 8,   # Administrador — 8 horas
        7: 4,   # Farmaceuta — 4 horas
    }
    horas = tiempos_por_rol.get(usuario.id_rol_id, 2)

    # Usamos UTC para que coincida con JavaScript
    expiracion = datetime.now(timezone.utc) + timedelta(hours=horas)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'expiracion': expiracion.isoformat(),
        'horas_sesion': horas,
    }


def verificar_contrasena(contrasena_ingresada, contrasena_guardada):
    """
    Verifica si la contraseña ingresada coincide con la guardada en BD
    bcrypt compara la contraseña con su versión encriptada
    """
    try:
        return bcrypt.checkpw(
            contrasena_ingresada.encode('utf-8'),
            contrasena_guardada.encode('utf-8')
        )
    except Exception:
        return False


def encriptar_contrasena(contrasena):
    """
    Encripta una contraseña usando bcrypt
    El resultado es un hash que no se puede revertir
    """
    # salt agrega aleatoriedad para que dos contraseñas iguales
    # generen hashes diferentes
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(contrasena.encode('utf-8'), salt)
    return hashed.decode('utf-8')


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {'error': 'Email y contraseña son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Buscamos el usuario por correo electrónico
        usuario = Usuarios.objects.select_related(
            'id_rol', 'id_estado_usuario'
        ).get(correo_electronico=email)

    except Usuarios.DoesNotExist:
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Verificamos que el usuario esté activo
    if usuario.id_estado_usuario_id != 1:
        return Response(
            {'error': 'Usuario inactivo, contacta al administrador'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Verificamos que el rol tenga acceso al sistema
    roles_permitidos = [5, 7]
    if usuario.id_rol_id not in roles_permitidos:
        return Response(
            {'error': 'No tienes acceso para acceder al sistema'},
            status=status.HTTP_403_FORBIDDEN
        )

    # Verificamos la contraseña
    if usuario.contrasena:
        # Si tiene contraseña encriptada la verificamos con bcrypt
        if not verificar_contrasena(password, usuario.contrasena):
            return Response(
                {'error': 'Credenciales inválidas'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    else:
        # Si no tiene contraseña aún usamos el número de documento
        # Esto es temporal hasta que todos tengan contraseña
        if usuario.numero_documento != int(password):
            return Response(
                {'error': 'Credenciales inválidas'},
                status=status.HTTP_401_UNAUTHORIZED
            )

    # Generamos los tokens JWT
    tokens = get_tokens_for_user(usuario)

    return Response({
        'access': tokens['access'],
        'refresh': tokens['refresh'],
        'expiracion': tokens['expiracion'],
        'horas_sesion': tokens['horas_sesion'],
        'usuario': {
            'id': usuario.id_tipo_usuario,
            'nombre': f"{usuario.nombres} {usuario.apellidos}",
            'email': usuario.correo_electronico,
            'rol': usuario.id_rol.nombre_rol,
            'id_rol': usuario.id_rol_id,
        }
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'error': 'Token inválido'}, status=status.HTTP_400_BAD_REQUEST)