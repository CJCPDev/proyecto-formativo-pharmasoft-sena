from rest_framework import viewsets
from .models import SubformaFarmaceutica
from .serializers import SubformaFarmaceuticaSerializer
from rest_framework.decorators import api_view 
from rest_framework.response import Response   
from .models import (
    Medicamentos,
    FormaFarmaceutica,
    ViaAdministracion,
    Laboratorios,
    EstadoMedicamento,
    Proveedores,
    Concentracion,
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

class MedicamentosViewSet(viewsets.ModelViewSet):
    queryset = Medicamentos.objects.all()
    serializer_class = MedicamentosSerializer

class FormaFarmaceuticaViewSet(viewsets.ModelViewSet):
    queryset = FormaFarmaceutica.objects.all()
    serializer_class = FormaFarmaceuticaSerializer

class ViaAdministracionViewSet(viewsets.ModelViewSet):
    queryset = ViaAdministracion.objects.all()
    serializer_class = ViaAdministracionSerializer

class LaboratoriosViewSet(viewsets.ModelViewSet):  #  plural para consistencia
    queryset = Laboratorios.objects.all()
    serializer_class = LaboratorioSerializer

class ProveedoresViewSet(viewsets.ModelViewSet):  #  plural para consistencia
    queryset = Proveedores.objects.all()
    serializer_class = ProveedorSerializer

class EstadoMedicamentoViewSet(viewsets.ModelViewSet):
    queryset = EstadoMedicamento.objects.all()
    serializer_class = EstadoMedicamentoSerializer

class ConcentracionViewSet(viewsets.ModelViewSet):
    queryset = Concentracion.objects.all()
    serializer_class = ConcentracionSerializer

class SubformaFarmaceuticaViewSet(viewsets.ModelViewSet):
    serializer_class = SubformaFarmaceuticaSerializer

    def get_queryset(self):
        queryset = SubformaFarmaceutica.objects.all()
        id_forma = self.request.query_params.get('id_forma')
        if id_forma:
            queryset = queryset.filter(id_forma_farmaceutica=id_forma)
        return queryset
    
@api_view(['GET'])
def buscar_medicamentos(request):
    q = request.GET.get('q', '')
    productos = Medicamentos.objects.filter(nombre_medicamento__icontains=q)
    serializer = MedicamentosSerializer(productos, many=True, context={'request': request})  # 👈
    return Response(serializer.data)