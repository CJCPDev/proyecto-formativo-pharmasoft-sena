from rest_framework import viewsets
from .models import Medicamentos, FormaFarmaceutica, ViaAdministracion, Laboratorios, EstadoMedicamento, Proveedores, Concentracion
from .serializers import (
    MedicamentosSerializer,
    FormaFarmaceuticaSerializer,
    ViaAdministracionSerializer,
    LaboratorioSerializer,
    EstadoMedicamentoSerializer,
    ProveedorSerializer,
    ConcentracionSerializer
)

class MedicamentosViewSet(viewsets.ModelViewSet):
    queryset = Medicamentos.objects.all()
    serializer_class = MedicamentosSerializer

class FormaFarmaceuticaViewSet(viewsets.ModelViewSet):
    queryset = FormaFarmaceutica.objects.all()
    serializer_class = FormaFarmaceuticaSerializer

class ViaAdministracionViewSet(viewsets.ModelViewSet):
    queryset = ViaAdministracion.objects.all()
    serializer_class = ViaAdministracionSerializer

class LaboratorioViewSet(viewsets.ModelViewSet):
    queryset = Laboratorios.objects.all()
    serializer_class = LaboratorioSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedores.objects.all()
    serializer_class = ProveedorSerializer

class EstadoMedicamentoViewSet(viewsets.ModelViewSet):
    queryset = EstadoMedicamento.objects.all()
    serializer_class = EstadoMedicamentoSerializer

# ViewSet para concentraciones
class ConcentracionViewSet(viewsets.ModelViewSet):
    queryset = Concentracion.objects.all()
    serializer_class = ConcentracionSerializer