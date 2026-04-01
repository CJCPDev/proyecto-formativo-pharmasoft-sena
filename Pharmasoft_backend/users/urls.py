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
    permisos_usuario_combinados
)
from .auth import login, logout

from .auth import login,logout

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
]