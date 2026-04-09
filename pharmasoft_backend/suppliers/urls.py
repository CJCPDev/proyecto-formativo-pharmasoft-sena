from django.urls import path, include
from rest_framework.routers import DefaultRouter
from suppliers import views

router = DefaultRouter()
router.register(r'suppliers', views.SupplierViewSet, basename='suppliers')
router.register(r'departamento', views.DepartamentoViewSet, basename='departamento')
router.register(r'municipio', views.MunicipioViewSet, basename='municipio')

urlpatterns = [
    path('', include(router.urls)),
]