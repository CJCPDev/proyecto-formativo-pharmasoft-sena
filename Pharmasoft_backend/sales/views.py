from rest_framework import viewsets
from .models import Ventas
from .serializers import VentaSerializer, VentaCreateSerializer

class VentasViewSet(viewsets.ModelViewSet):
    queryset = Ventas.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return VentaCreateSerializer
        return VentaSerializer