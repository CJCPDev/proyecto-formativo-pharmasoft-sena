from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import SubformaFarmaceuticaViewSet, buscar_medicamentos  # 👈 importa la vista
from .views import (
    MedicamentosViewSet,
    FormaFarmaceuticaViewSet,
    ViaAdministracionViewSet,
    LaboratoriosViewSet,
    ProveedoresViewSet,
    EstadoMedicamentoViewSet,
    ConcentracionViewSet,
)

router = DefaultRouter()
router.register(r'medicamentos', MedicamentosViewSet)
router.register(r'formas-farmaceuticas', FormaFarmaceuticaViewSet)
router.register(r'vias-administracion', ViaAdministracionViewSet)
router.register(r'laboratorios', LaboratoriosViewSet)
router.register(r'proveedores', ProveedoresViewSet)
router.register(r'estados-medicamento', EstadoMedicamentoViewSet)
router.register(r'concentraciones', ConcentracionViewSet)
router.register(r'subformas-farmaceuticas', SubformaFarmaceuticaViewSet, basename='subformas-farmaceuticas')

urlpatterns = [
    path('medicamentos/buscar/', buscar_medicamentos),  # 👈 nueva ruta
] + router.urls 