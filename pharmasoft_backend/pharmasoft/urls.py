from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import (
    MedicamentosViewSet,
    FormaFarmaceuticaViewSet,
    ViaAdministracionViewSet,
    LaboratorioViewSet,
    ProveedorViewSet,
    EstadoMedicamentoViewSet,
    ConcentracionViewSet
)

router = routers.DefaultRouter()
router.register(r'medicamentos', MedicamentosViewSet)
router.register(r'forma_farmaceutica', FormaFarmaceuticaViewSet)
router.register(r'via_administracion', ViaAdministracionViewSet)
router.register(r'laboratorios', LaboratorioViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'estado_medicamento', EstadoMedicamentoViewSet)
router.register(r'concentraciones', ConcentracionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]