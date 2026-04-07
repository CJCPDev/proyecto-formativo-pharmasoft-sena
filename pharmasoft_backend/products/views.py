# products/views.py
from rest_framework import viewsets
from .models import (
    Medicamentos,
    FormaFarmaceutica,
    ViaAdministracion,
    Laboratorios,
    EstadoMedicamento,
    Proveedores,
    Concentracion
)
from .serializers import (
    MedicamentosSerializer,
    FormaFarmaceuticaSerializer,
    ViaAdministracionSerializer,
    LaboratorioSerializer,
    EstadoMedicamentoSerializer,
    ProveedorSerializer,
    ConcentracionSerializer
)

# ViewSet para medicamentos
class MedicamentosViewSet(viewsets.ModelViewSet):
    queryset = Medicamentos.objects.all()
    serializer_class = MedicamentosSerializer

# ViewSet para formas farmacéuticas
class FormaFarmaceuticaViewSet(viewsets.ModelViewSet):
    queryset = FormaFarmaceutica.objects.all()
    serializer_class = FormaFarmaceuticaSerializer

# ViewSet para vías de administración
class ViaAdministracionViewSet(viewsets.ModelViewSet):
    queryset = ViaAdministracion.objects.all()
    serializer_class = ViaAdministracionSerializer

# ViewSet para laboratorios
class LaboratorioViewSet(viewsets.ModelViewSet):
    queryset = Laboratorios.objects.all()
    serializer_class = LaboratorioSerializer

# ViewSet para proveedores
class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedores.objects.all()
    serializer_class = ProveedorSerializer

# ViewSet para estados de medicamento
class EstadoMedicamentoViewSet(viewsets.ModelViewSet):
    queryset = EstadoMedicamento.objects.all()
    serializer_class = EstadoMedicamentoSerializer

# ViewSet para concentraciones
class ConcentracionViewSet(viewsets.ModelViewSet):
    queryset = Concentracion.objects.all()
    serializer_class = ConcentracionSerializer
