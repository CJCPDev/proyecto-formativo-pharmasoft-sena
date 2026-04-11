# Vistas de la API del módulo de medicamentos.
# Cada ViewSet expone automáticamente los endpoints REST estándar (listar, crear,
# obtener, actualizar y eliminar) para su modelo correspondiente.

from rest_framework import viewsets
from rest_framework.decorators import api_view 
from rest_framework.response import Response   

# Importamos los modelos
from .models import (
    Medicamentos,
    FormaFarmaceutica,
    ViaAdministracion,
    Laboratorios,
    EstadoMedicamento,
    Proveedores,
    Concentracion,
    SubformaFarmaceutica,
)

# Importamos los serializers
from .serializers import (
    MedicamentosSerializer,
    FormaFarmaceuticaSerializer,
    ViaAdministracionSerializer,
    LaboratorioSerializer,
    EstadoMedicamentoSerializer,
    ProveedorSerializer,
    ConcentracionSerializer,
    SubformaFarmaceuticaSerializer,
)


# -------------------------------
# ViewSets estándar para cada modelo
# -------------------------------

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


# -------------------------------
# Endpoint personalizado
# -------------------------------
# Este endpoint es para actualizar el estado de un medicamento
# directamente desde la tabla (cuando el usuario cambia el switch).
# Se invoca con: PUT /medicamentos/{id_medicamento}/estado
@api_view(['PUT'])
def actualizar_estado(request, id_medicamento):
    nuevo_estado = request.data.get('id_estado')
    medicamento = Medicamentos.objects.get(pk=id_medicamento)
    # Buscamos el objeto EstadoMedicamento con ese id
    # en lugar de asignar el número directamente
    estado = EstadoMedicamento.objects.get(pk=nuevo_estado)
    medicamento.id_estado = estado
    medicamento.save()
    return Response({"message": "Estado actualizado"})

# -------------------------------
# ViewSet con filtrado dinámico
# -------------------------------
# A diferencia de los demás, este no define queryset fijo porque depende
# de parámetros de la petición (ejemplo: ?id_forma=3).
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
