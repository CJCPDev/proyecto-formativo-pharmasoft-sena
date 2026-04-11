from rest_framework.viewsets import ModelViewSet
from .models import Ventas
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import Max
from .serializers import VentaSerializer, VentaCreateSerializer


class VentasViewSet(viewsets.ModelViewSet):
    queryset = Ventas.objects.all()
    serializer_class = VentaSerializer


    def get_serializer_class(self):
        if self.action == 'create':
            return VentaCreateSerializer
        return VentaSerializer

    def create(self, request, *args, **kwargs):
        serializer = VentaCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        last = Ventas.objects.aggregate(Max('id_factura'))['id_factura__max']
        consecutivo = (last or 0) + 1

        subtotal = serializer.validated_data.get("subtotal_venta", 0)
        descuento = serializer.validated_data.get("descuento_venta", 0)

        iva = float(subtotal) * 0.19
        total = float(subtotal) + iva - float(descuento)

        venta = serializer.save(
            id_factura=consecutivo,
            iva_venta=iva,
            total_venta=total
        )

        return Response({
            "numeroFactura": venta.id_factura,
            "fechaHora": venta.fecha_hora,
            "iva": venta.iva_venta,
            "total": venta.total_venta
        })