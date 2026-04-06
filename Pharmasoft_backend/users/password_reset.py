# ─────────────────────────────────────────────
# users/password_reset.py
# Maneja la recuperación de contraseña
# Envía un código de 6 dígitos al email del usuario
# ─────────────────────────────────────────────

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import Usuarios
import random
import string
from datetime import datetime, timedelta, timezone

# Almacenamiento temporal de códigos
# {email: {codigo: '123456', expiracion: datetime}}
codigos_temporales = {}


def generar_codigo():
    """Genera un código aleatorio de 6 dígitos"""
    return ''.join(random.choices(string.digits, k=6))


@api_view(['POST'])
@permission_classes([AllowAny])
def solicitar_codigo(request):
    email = request.data.get('email')

    if not email:
        return Response(
            {'error': 'El email es requerido'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        usuario = Usuarios.objects.get(correo_electronico=email)
    except Usuarios.DoesNotExist:
        return Response(
            {'error': 'No existe una cuenta con ese email'},
            status=status.HTTP_404_NOT_FOUND
        )

    codigo = generar_codigo()

    # Guardamos el código con expiración de 10 minutos
    codigos_temporales[email] = {
        'codigo': codigo,
        'expiracion': datetime.now(timezone.utc) + timedelta(minutes=10),
        'id_usuario': usuario.id_tipo_usuario
    }

    # Enviamos el email con el código
    send_mail(
        subject='Código de verificación - Pharmasoft',
        message=f'''
Hola {usuario.nombres},

Tu código de verificación para restablecer tu contraseña es:

{codigo}

Este código expira en 10 minutos.

Si no solicitaste este código ignora este mensaje.

Pharmasoft
        ''',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response(
        {'message': 'Código enviado correctamente'},
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def verificar_codigo(request):
    email = request.data.get('email')
    codigo = request.data.get('codigo')

    if not email or not codigo:
        return Response(
            {'error': 'Email y código son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if email not in codigos_temporales:
        return Response(
            {'error': 'No se encontró un código para este email'},
            status=status.HTTP_400_BAD_REQUEST
        )

    datos = codigos_temporales[email]

    if datetime.now(timezone.utc) > datos['expiracion']:
        del codigos_temporales[email]
        return Response(
            {'error': 'El código ha expirado, solicita uno nuevo'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if datos['codigo'] != codigo:
        return Response(
            {'error': 'Código incorrecto'},
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response(
        {
            'message': 'Código verificado correctamente',
            'id_usuario': datos['id_usuario']
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def cambiar_contrasena(request):
    email = request.data.get('email')
    codigo = request.data.get('codigo')
    nueva_contrasena = request.data.get('nueva_contrasena')

    if not email or not codigo or not nueva_contrasena:
        return Response(
            {'error': 'Email, código y nueva contraseña son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if email not in codigos_temporales:
        return Response(
            {'error': 'Sesión expirada, solicita un nuevo código'},
            status=status.HTTP_400_BAD_REQUEST
        )

    datos = codigos_temporales[email]

    if datetime.now(timezone.utc) > datos['expiracion']:
        del codigos_temporales[email]
        return Response(
            {'error': 'El código ha expirado'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if datos['codigo'] != codigo:
        return Response(
            {'error': 'Código incorrecto'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        from .auth import encriptar_contrasena
        usuario = Usuarios.objects.get(correo_electronico=email)
        usuario.contrasena = encriptar_contrasena(nueva_contrasena)
        usuario.save()

        # Eliminamos el código usado
        del codigos_temporales[email]

        return Response(
            {'message': 'Contraseña actualizada correctamente'},
            status=status.HTTP_200_OK
        )
    except Usuarios.DoesNotExist:
        return Response(
            {'error': 'Usuario no encontrado'},
            status=status.HTTP_404_NOT_FOUND
        )