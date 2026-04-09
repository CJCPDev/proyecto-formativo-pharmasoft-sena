from rest_framework import viewsets
from suppliers.serializers import SupplierSerializer, DepartamentoSerializer, MunicipioSerializer
from suppliers.models import Suppliers, Departamento, Municipio

class SupplierViewSet(viewsets.ModelViewSet):
    serializer_class = SupplierSerializer
    queryset = Suppliers.objects.all()

class DepartamentoViewSet(viewsets.ModelViewSet):
    serializer_class = DepartamentoSerializer
    queryset = Departamento.objects.all()

class MunicipioViewSet(viewsets.ModelViewSet):
    serializer_class = MunicipioSerializer
    def get_queryset(self):
        queryset = Municipio.objects.all()
        departamento_id = self.request.query_params.get('departamento')
        if departamento_id:
            queryset = queryset.filter(id_departamento=departamento_id)
        return queryset
