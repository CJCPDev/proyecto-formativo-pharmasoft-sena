from django.db import models

# Create your models here.

from django.db import models
from decimal import Decimal 

class Ventas(models.Model):
    id_factura = models.IntegerField(unique=True)
    fecha_hora = models.DateTimeField(auto_now_add=True)
    usuario = models.CharField(max_length=50)
    farmaceuta = models.CharField(max_length=50)
    descuento_venta = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    subtotal_venta = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    iva_venta = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_venta = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    ESTADOS = [
        ('Activo', 'ACTIVO'),
        ('Cancelado', 'CANCELADO'),
        ('Confirmado', 'CONFIRMADO'),
    ]

    estado_venta = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='Activo'
    )

    class Meta:
        db_table = "ventas"

    # 🔥 AQUÍ DENTRO (CORRECTO)
    def save(self, *args, **kwargs):
        self.iva_venta = self.subtotal_venta * Decimal("0.19")
        self.total_venta = self.subtotal_venta + self.iva_venta - self.descuento_venta
        super().save(*args, **kwargs)

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Ventas, on_delete=models.CASCADE)
    producto = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "detalleventa"