# from rest_framework import serializers
# from .models import SubformaFarmaceutica
# from .models import (
#     Medicamentos,
#     FormaFarmaceutica,
#     ViaAdministracion,
#     Laboratorios,
#     EstadoMedicamento,
#     Proveedores,
#     Concentracion
# )

# class SubformaFarmaceuticaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SubformaFarmaceutica
#         fields = ['id_subforma_farmaceutica', 'nombre_subforma_farmaceutica', 'id_forma_farmaceutica']
        
# class FormaFarmaceuticaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FormaFarmaceutica
#         fields = ["id_forma_farmaceutica", "nombre_forma_farmaceutica"]

# class ViaAdministracionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ViaAdministracion
#         fields = ["id_via_administracion", "nombre_via_administracion"]

# class LaboratorioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Laboratorios
#         fields = ["id_laboratorio", "nombre_laboratorio"]

# class ProveedorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Proveedores
#         fields = ["id_proveedor", "nombre_proveedor"]

# class EstadoMedicamentoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EstadoMedicamento
#         fields = ["id_estado", "nombre_estado"]

# class ConcentracionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Concentracion
#         fields = ["id_concentracion", "nombre_tipo_concentracion"]

# # 🔹 Medicamentos
# class MedicamentosSerializer(serializers.ModelSerializer):
#     # Campos extra para mostrar nombres de las relaciones
#     nombre_forma_farmaceutica = serializers.CharField(source="id_forma_farmaceutica.nombre_forma_farmaceutica", read_only=True)
#     nombre_via_administracion = serializers.CharField(source="id_via_administracion.nombre_via_administracion", read_only=True)
#     nombre_laboratorio = serializers.CharField(source="id_laboratorio.nombre_laboratorio", read_only=True)
#     nombre_estado = serializers.CharField(source="id_estado.nombre_estado", read_only=True)
#     nombre_proveedor = serializers.CharField(source="id_proveedor.nombre_proveedor", read_only=True)
#     nombre_subforma_farmaceutica = serializers.CharField(source="id_subforma_farmaceutica.nombre_subforma_farmaceutica", read_only=True)

#     # Campo para la imagen (URL)
#     imagen_url = serializers.SerializerMethodField()

#     def get_imagen_url(self, obj):
#         if obj.imagen:
#             return obj.imagen.url
#         return None

#     class Meta:
#         model = Medicamentos
#         fields = [
#             "id_medicamento",
#             "nombre_medicamento",
#             "lote",
#             "fecha_fabricacion",
#             "fecha_vencimiento",
#             "stock",
#             "precio_compra",
#             "precio_venta",
#             "requiere_formula",
#             "descripcion",
#             "concentracion",
#             "imagen",          # archivo
#             "imagen_url",      # URL para frontend
#             "id_forma_farmaceutica",
#             "nombre_forma_farmaceutica",
#             "id_subforma_farmaceutica",
#             "nombre_subforma_farmaceutica",
#             "id_via_administracion",
#             "nombre_via_administracion",
#             "id_laboratorio",
#             "nombre_laboratorio",
#             "id_estado",
#             "nombre_estado",
#             "id_proveedor",
#             "nombre_proveedor",
#         ]

# Serializadores del módulo de medicamentos.
# Convierten los modelos de Django a JSON para la API y viceversa.

from rest_framework import serializers
from .models import SubformaFarmaceutica
from .models import (
    Medicamentos,
    FormaFarmaceutica,
    ViaAdministracion,
    Laboratorios,
    EstadoMedicamento,
    Proveedores,
    Concentracion
)


# Serializa las subformas farmacéuticas incluyendo la referencia a su forma padre
class SubformaFarmaceuticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubformaFarmaceutica
        fields = ['id_subforma_farmaceutica', 'nombre_subforma_farmaceutica', 'id_forma_farmaceutica']


# Serializa las formas farmacéuticas (ej: tableta, jarabe, cápsula)
class FormaFarmaceuticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaFarmaceutica
        fields = ["id_forma_farmaceutica", "nombre_forma_farmaceutica"]


# Serializa las vías de administración (ej: oral, intravenosa, tópica)
class ViaAdministracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViaAdministracion
        fields = ["id_via_administracion", "nombre_via_administracion"]


# Serializa los laboratorios fabricantes
class LaboratorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratorios
        fields = ["id_laboratorio", "nombre_laboratorio"]


# Serializa los proveedores distribuidores
class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = ["id_proveedor", "nombre_proveedor"]


# Serializa los estados posibles de un medicamento (ej: activo, inactivo)
class EstadoMedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoMedicamento
        fields = ["id_estado", "nombre_estado"]


# Serializa los tipos de concentración (ej: mg, ml)
class ConcentracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concentracion
        fields = ["id_concentracion", "nombre_tipo_concentracion"]


# Serializa el modelo principal Medicamentos.
# Incluye tanto los ids de las relaciones como los nombres legibles para el frontend,
# evitando que el cliente tenga que hacer peticiones adicionales para obtenerlos.
class MedicamentosSerializer(serializers.ModelSerializer):

    # Campos de solo lectura que exponen el nombre del registro relacionado.
    # source indica el camino de atributos desde el modelo hasta el valor deseado.
    nombre_forma_farmaceutica     = serializers.CharField(source="id_forma_farmaceutica.nombre_forma_farmaceutica", read_only=True)
    nombre_via_administracion     = serializers.CharField(source="id_via_administracion.nombre_via_administracion", read_only=True)
    nombre_laboratorio            = serializers.CharField(source="id_laboratorio.nombre_laboratorio", read_only=True)
    nombre_estado                 = serializers.CharField(source="id_estado.nombre_estado", read_only=True)
    nombre_proveedor              = serializers.CharField(source="id_proveedor.nombre_proveedor", read_only=True)
    nombre_subforma_farmaceutica  = serializers.CharField(source="id_subforma_farmaceutica.nombre_subforma_farmaceutica", read_only=True)

    # Campo calculado que devuelve la URL pública de la imagen del medicamento.
    # Se usa SerializerMethodField porque requiere lógica condicional.
    imagen_url = serializers.SerializerMethodField()

    # Retorna la URL de la imagen si existe, o None si el medicamento no tiene imagen
    def get_imagen_url(self, obj):
        if obj.imagen:
            return obj.imagen.url
        return None

    class Meta:
        model = Medicamentos
        fields = [
            "id_medicamento",
            "nombre_medicamento",
            "lote",
            "fecha_fabricacion",
            "fecha_vencimiento",
            "stock",
            "precio_compra",
            "precio_venta",
            "requiere_formula",
            "descripcion",
            "concentracion",
            "imagen",          # Archivo de imagen usado para subir o actualizar
            "imagen_url",      # URL generada para que el frontend pueda mostrar la imagen
            "id_forma_farmaceutica",
            "nombre_forma_farmaceutica",
            "id_subforma_farmaceutica",
            "nombre_subforma_farmaceutica",
            "id_via_administracion",
            "nombre_via_administracion",
            "id_laboratorio",
            "nombre_laboratorio",
            "id_estado",
            "nombre_estado",
            "id_proveedor",
            "nombre_proveedor",
        ]