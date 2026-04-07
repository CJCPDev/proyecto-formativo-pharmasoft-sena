from rest_framework.viewsets import ModelViewSet
from .models import Ventas
from .serializers import SaleSerializer

class VentasViewSet(ModelViewSet):
    queryset = Ventas.objects.all()
    serializer_class = SaleSerializer