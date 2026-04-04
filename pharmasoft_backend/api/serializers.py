# ─────────────────────────────────────────────
# medicamentos/serializers.py
# Serializers del módulo de medicamentos
# Convierte los datos entre el formato de la BD
# y los nombres que usa React en el frontend
# ─────────────────────────────────────────────
from rest_framework import serializers
from .models import Medicamentos, FormaFarmaceutica, ViaAdministracion, Laboratorios, EstadoMedicamento, Proveedores, Concentracion

class MedicamentosSerializer(serializers.ModelSerializer):
    nombreMedicamento       = serializers.CharField(source='nombre_medicamento')
    lote                    = serializers.CharField()
    fechaFabricacion        = serializers.DateField(source='fecha_fabricacion')
    fechaVencimiento        = serializers.DateField(source='fecha_vencimiento')
    stock                   = serializers.CharField()
    precioCosto             = serializers.DecimalField(source='precio_compra', max_digits=10, decimal_places=2)
    precioVenta             = serializers.DecimalField(source='precio_venta', max_digits=10, decimal_places=2)
    requiresPrescription    = serializers.CharField(source='requiere_formula')
    description             = serializers.CharField(source='descripcion')

    # Forma farmacéutica
    formaFarmaceutica       = serializers.IntegerField(source='id_forma_farmaceutica_id', required=False, allow_null=True)
    formaFarmaceuticaNombre = serializers.CharField(source='id_forma_farmaceutica.nombre_forma_farmaceutica', read_only=True)

    # Vía de administración
    viaAdministracion       = serializers.IntegerField(source='id_via_administracion_id', required=False, allow_null=True)
    viaAdministracionNombre = serializers.CharField(source='id_via_administracion.nombre_via_administracion', read_only=True)

    # Laboratorio
    laboratorio             = serializers.IntegerField(source='id_laboratorio_id', required=False, allow_null=True)
    laboratorioNombre       = serializers.CharField(source='id_laboratorio.nombre_laboratorio', read_only=True)

    # Proveedor
    proveedor               = serializers.IntegerField(source='id_proveedor_id', required=False, allow_null=True)
    proveedorNombre         = serializers.CharField(source='id_proveedor.nombre_proveedor', read_only=True)

    # Estado
    estado                  = serializers.IntegerField(source='id_estado_id', required=False, allow_null=True)
    estadoNombre            = serializers.CharField(source='id_estado.nombre_estado', read_only=True)

    # Concentración como texto libre
    concentracion           = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Medicamentos
        fields = [
            'id_medicamento',
            'nombreMedicamento',
            'lote',
            'fechaFabricacion',
            'fechaVencimiento',
            'stock',
            'precioCosto',
            'precioVenta',
            'requiresPrescription',
            'description',
            'formaFarmaceutica',
            'formaFarmaceuticaNombre',
            'viaAdministracion',
            'viaAdministracionNombre',
            'laboratorio',
            'laboratorioNombre',
            'proveedor',
            'proveedorNombre',
            'estado',
            'estadoNombre',
            'concentracion',
        ]


# Serializers auxiliares para los selects
class FormaFarmaceuticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaFarmaceutica
        fields = ['id_forma_farmaceutica', 'nombre_forma_farmaceutica']

class ViaAdministracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViaAdministracion
        fields = ['id_via_administracion', 'nombre_via_administracion']

class LaboratorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratorios
        fields = ['id_laboratorio', 'nombre_laboratorio']

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = ['id_proveedor', 'nombre_proveedor']

class EstadoMedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoMedicamento
        fields = ['id_estado', 'nombre_estado']

# Serializer para concentraciones
class ConcentracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concentracion
        fields = ['id_concentracion', 'nombre_tipo_concentracion']