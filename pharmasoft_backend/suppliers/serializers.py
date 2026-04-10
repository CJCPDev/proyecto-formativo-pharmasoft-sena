from rest_framework import serializers
from suppliers.models import Suppliers, Departamento, Municipio


class SupplierSerializer(serializers.ModelSerializer):
    razonSocial = serializers.CharField(source='razon_social')
    telefonoContacto = serializers.CharField(source='telefono_contacto')
    nombreContacto = serializers.CharField(source='nombre_contacto')
    nombre = serializers.CharField(source='nombre_proveedor')
    correo = serializers.CharField(source='correo_contacto')
    ciudad = serializers.PrimaryKeyRelatedField(
        source='id_municipio',
        queryset=Municipio.objects.all()
    )
    departamento = serializers.PrimaryKeyRelatedField(
        source='id_departamento',
        queryset=Departamento.objects.all()
    )
    nombreCiudad = serializers.CharField(source='id_municipio.nombre_municipio', read_only=True)
    nombreDepartamento = serializers.CharField(source='id_departamento.nombre_departamento', read_only=True)

    class Meta:
        model = Suppliers
        fields = [
            'id',
            'nit',
            'nombre',
            'razonSocial',
            'direccion',
            'correo',
            'telefonoContacto',
            'estado',
            'ciudad',
            'departamento',
            'nombreCiudad',
            'nombreDepartamento',
            'nombreContacto'
        ]

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = "__all__" 
class MunicipioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipio
        fields = "__all__" 