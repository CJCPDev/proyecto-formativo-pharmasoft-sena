from django.db import models

# Create your models here.

from django.db import models
    
class Ventas(models.Model):
    id_factura = models.AutoField(primary_key=True)
    fecha_hora = models.DateTimeField()
    usuario = models.CharField(max_length=50)
    farmaceuta = models.CharField(max_length=50)
    subtotal_venta = models.DecimalField(max_digits=10, decimal_places=2)
    iva_venta = models.DecimalField(max_digits=10, decimal_places=2)
    descuento_venta = models.DecimalField(max_digits=10, decimal_places=2)
    total_venta = models.DecimalField(max_digits=10, decimal_places=2)
    estado_venta = models.CharField(max_length=3, null=True, blank=True)
    class Meta:
        db_table = 'ventas'