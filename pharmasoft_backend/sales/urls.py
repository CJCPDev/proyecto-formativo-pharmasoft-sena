from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VentasViewSet

router = DefaultRouter()
router.register(r'ventas', VentasViewSet, basename='ventas')

urlpatterns = [
    path('', include(router.urls)),
]