# products/serializers.py
from rest_framework import serializers
from .models import (
    Medicamentos,
    FormaFarmaceutica,
    ViaAdministracion,
    Laboratorios,
    EstadoMedicamento,
    Proveedores,
    Concentracion
)

class FormaFarmaceuticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaFarmaceutica
        fields = '__all__'
    
class ViaAdministracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViaAdministracion
        fields = '__all__'

class LaboratorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratorios
        fields = '__all__'

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = '__all__'

class EstadoMedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoMedicamento
        fields = '__all__'

class ConcentracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concentracion
        fields = '__all__'

class MedicamentosSerializer(serializers.ModelSerializer):
    id_forma_farmaceutica = FormaFarmaceuticaSerializer(read_only=True)
    id_via_administracion = ViaAdministracionSerializer(read_only=True)
    id_laboratorio = LaboratorioSerializer(read_only=True)
    id_estado = EstadoMedicamentoSerializer(read_only=True)
    id_proveedor = ProveedorSerializer(read_only=True)

    class Meta:
        model = Medicamentos
        fields = '__all__'
