from django.db import models

# Create your models here.

from django.db import models
    
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
        managed = False
        db_table = 'ventas'

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    codigo_barras = models.CharField(max_length=50, unique=True)

    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)

    stock = models.PositiveIntegerField(default=0)

    descripcion = models.TextField(blank=True, null=True)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class DetalleVenta(models.Model):
    venta = models.ForeignKey(
        Ventas,
        related_name="detalles",
        on_delete=models.CASCADE
    )

    producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE
    )

    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )





