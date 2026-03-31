# ─────────────────────────────────────────────
# pharmasoft/urls.py
# URLs principales del proyecto
# Incluye las URLs de cada módulo
# ─────────────────────────────────────────────

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Módulo de usuarios
    path('api/', include('users.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)