# ─────────────────────────────────────────────
# users/urls.py
# URLs del módulo de usuarios
# ─────────────────────────────────────────────

from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet,
    TipoDocumentoViewSet,
    RolViewSet,
    PermisoViewSet,
    RolPermisoViewSet,
    UsuarioPermisoViewSet,
    subir_avatar,
    cambiar_estado_usuario,
    permisos_usuario_combinados,
    cambiar_contrasena,
    obtener_carrito,
    agregar_al_carrito,
    actualizar_cantidad,
    eliminar_del_carrito,
    vaciar_carrito
)
from .auth import login, logout

from .password_reset import solicitar_codigo, verificar_codigo, cambiar_contrasena as cambiar_contrasena_reset

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'tipo-documento', TipoDocumentoViewSet)
router.register(r'roles', RolViewSet)
router.register(r'permisos', PermisoViewSet)
router.register(r'rol-permisos', RolPermisoViewSet, basename='rol-permiso')
router.register(r'usuario-permisos', UsuarioPermisoViewSet, basename='usuario-permiso')

urlpatterns = router.urls + [
    path('subir-avatar/', subir_avatar, name='subir-avatar'),
    path('usuarios/<int:pk>/cambiar-estado/', cambiar_estado_usuario, name='cambiar-estado-usuario'),
    path('usuarios/<int:pk>/permisos-combinados/', permisos_usuario_combinados, name='permisos-combinados'),
    # Endpoints de autentificación
    path('auth/login/', login, name='login'),
    path('auth/logout/', logout, name='logout'),
    path('usuarios/<int:pk>/cambiar_contrasena/', cambiar_contrasena, name='cambiar-contrasena'),

    # Recupereación de contraseña
    path('auth/solicitar-codigo/', solicitar_codigo, name='solicitar-codigo'),
    path('auth/verificar-codigo/', verificar_codigo, name='verificar-codigo'),
    path('auth/cambiar-contrasena/', cambiar_contrasena_reset, name='cambiar-contrasena-reset'),

    # URLs del carrito
    path('carrito/<int:id_usuario>/', obtener_carrito, name='obtener-carrito'),
    path('carrito/agregar/', agregar_al_carrito, name='agregar-carrito'),
    path('carrito/<int:id_carrito>/actualizar/', actualizar_cantidad, name='actualizar-carrito'),
    path('carrito/<int:id_carrito>/eliminar/', eliminar_del_carrito, name='eliminar-carrito'),
    path('carrito/<int:id_usuario>/vaciar/', vaciar_carrito, name='vaciar-carrito'),
]