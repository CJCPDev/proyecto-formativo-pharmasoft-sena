from rest_framework import serializers
from .models import Ventas, DetalleVenta



# Este es para obtener de la base de datos
class VentaSerializer(serializers.ModelSerializer):
    numeroFactura = serializers.IntegerField(source='id_factura', read_only=True)
    fechaHora = serializers.DateTimeField(source='fecha_hora', read_only=True)
    is_active = serializers.BooleanField(source='estado_venta', read_only=True)

    class Meta:
        model = Ventas
        fields = [
            'id',
            'id_factura',
            'numeroFactura',
            'fechaHora',
            'usuario',
            'farmaceuta',
            'subtotal_venta',
            'iva_venta',
            'descuento_venta',
            'total_venta',
            'is_active'
        ]


class VentaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = ["usuario", "farmaceuta", "estado_venta"]


class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = "__all__"