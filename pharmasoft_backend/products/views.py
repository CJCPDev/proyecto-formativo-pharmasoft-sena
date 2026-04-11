# from rest_framework import viewsets
# from .models import SubformaFarmaceutica
# from .serializers import SubformaFarmaceuticaSerializer
# from .models import (
#     Medicamentos,
#     FormaFarmaceutica,
#     ViaAdministracion,
#     Laboratorios,
#     EstadoMedicamento,
#     Proveedores,
#     Concentracion,
# )
# from .serializers import (
#     MedicamentosSerializer,
#     FormaFarmaceuticaSerializer,
#     ViaAdministracionSerializer,
#     LaboratorioSerializer,
#     EstadoMedicamentoSerializer,
#     ProveedorSerializer,
#     ConcentracionSerializer
# )

# class MedicamentosViewSet(viewsets.ModelViewSet):
#     queryset = Medicamentos.objects.all()
#     serializer_class = MedicamentosSerializer

# class FormaFarmaceuticaViewSet(viewsets.ModelViewSet):
#     queryset = FormaFarmaceutica.objects.all()
#     serializer_class = FormaFarmaceuticaSerializer

# class ViaAdministracionViewSet(viewsets.ModelViewSet):
#     queryset = ViaAdministracion.objects.all()
#     serializer_class = ViaAdministracionSerializer

# class LaboratoriosViewSet(viewsets.ModelViewSet):  #  plural para consistencia
#     queryset = Laboratorios.objects.all()
#     serializer_class = LaboratorioSerializer

# class ProveedoresViewSet(viewsets.ModelViewSet):  #  plural para consistencia
#     queryset = Proveedores.objects.all()
#     serializer_class = ProveedorSerializer

# class EstadoMedicamentoViewSet(viewsets.ModelViewSet):
#     queryset = EstadoMedicamento.objects.all()
#     serializer_class = EstadoMedicamentoSerializer

# class ConcentracionViewSet(viewsets.ModelViewSet):
#     queryset = Concentracion.objects.all()
#     serializer_class = ConcentracionSerializer

# class SubformaFarmaceuticaViewSet(viewsets.ModelViewSet):
#     serializer_class = SubformaFarmaceuticaSerializer

#     def get_queryset(self):
#         queryset = SubformaFarmaceutica.objects.all()
#         id_forma = self.request.query_params.get('id_forma')
#         if id_forma:
#             queryset = queryset.filter(id_forma_farmaceutica=id_forma)
#         return queryset

# Vistas de la API del módulo de medicamentos.
# Cada ViewSet expone automáticamente los endpoints REST estándar (listar, crear,
# obtener, actualizar y eliminar) para su modelo correspondiente.

from rest_framework import viewsets
from .models import SubformaFarmaceutica
from .serializers import SubformaFarmaceuticaSerializer
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


# Expone todos los endpoints REST para el modelo Medicamentos
class MedicamentosViewSet(viewsets.ModelViewSet):
    queryset = Medicamentos.objects.all()
    serializer_class = MedicamentosSerializer


# Expone todos los endpoints REST para el modelo FormaFarmaceutica
class FormaFarmaceuticaViewSet(viewsets.ModelViewSet):
    queryset = FormaFarmaceutica.objects.all()
    serializer_class = FormaFarmaceuticaSerializer


# Expone todos los endpoints REST para el modelo ViaAdministracion
class ViaAdministracionViewSet(viewsets.ModelViewSet):
    queryset = ViaAdministracion.objects.all()
    serializer_class = ViaAdministracionSerializer


# Expone todos los endpoints REST para el modelo Laboratorios
class LaboratoriosViewSet(viewsets.ModelViewSet):
    queryset = Laboratorios.objects.all()
    serializer_class = LaboratorioSerializer


# Expone todos los endpoints REST para el modelo Proveedores
class ProveedoresViewSet(viewsets.ModelViewSet):
    queryset = Proveedores.objects.all()
    serializer_class = ProveedorSerializer


# Expone todos los endpoints REST para el modelo EstadoMedicamento
class EstadoMedicamentoViewSet(viewsets.ModelViewSet):
    queryset = EstadoMedicamento.objects.all()
    serializer_class = EstadoMedicamentoSerializer


# Expone todos los endpoints REST para el modelo Concentracion
class ConcentracionViewSet(viewsets.ModelViewSet):
    queryset = Concentracion.objects.all()
    serializer_class = ConcentracionSerializer


# ViewSet de subformas farmacéuticas con soporte para filtrado dinámico.
# A diferencia de los demás, no define queryset como atributo de clase porque
# el resultado varía según los parámetros de la petición.
class SubformaFarmaceuticaViewSet(viewsets.ModelViewSet):
    serializer_class = SubformaFarmaceuticaSerializer

    def get_queryset(self):
        # Comenzamos con todas las subformas disponibles
        queryset = SubformaFarmaceutica.objects.all()

        # Si la petición incluye el parámetro id_forma, filtramos las subformas
        # que pertenecen a esa forma farmacéutica específica.
        # Ejemplo: GET /subformas-farmaceuticas/?id_forma=3
        id_forma = self.request.query_params.get('id_forma')
        if id_forma:
            queryset = queryset.filter(id_forma_farmaceutica=id_forma)

        return queryset