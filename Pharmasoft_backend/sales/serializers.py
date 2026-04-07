from rest_framework import serializers
from .models import Ventas

class SaleSerializer(serializers.ModelSerializer):
    numeroFactura = serializers.IntegerField(source='id_factura')
    fechaHora = serializers.DateTimeField(source='fecha_hora')

    # ejemplo simple (puedes cambiar luego)
    is_active = serializers.BooleanField(source='estado_venta')

    class Meta:
        model = Ventas
        fields = [
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