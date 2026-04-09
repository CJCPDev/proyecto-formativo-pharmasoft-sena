# products/urls.py
from rest_framework.routers import DefaultRouter
from .views import (
    MedicamentosViewSet,
    FormaFarmaceuticaViewSet,
    ViaAdministracionViewSet,
    LaboratorioViewSet,
    ProveedorViewSet,
    EstadoMedicamentoViewSet,
    ConcentracionViewSet
)

router = DefaultRouter()
router.register(r'medicamentos', MedicamentosViewSet)
router.register(r'formas-farmaceuticas', FormaFarmaceuticaViewSet)
router.register(r'vias-administracion', ViaAdministracionViewSet)
router.register(r'laboratorios', LaboratorioViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'estados-medicamento', EstadoMedicamentoViewSet)
router.register(r'concentraciones', ConcentracionViewSet)

urlpatterns = router.urls
