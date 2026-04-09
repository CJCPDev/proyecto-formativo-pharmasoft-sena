from django.db import models

# Create your models here.
class Departamento(models.Model):
    id_departamento = models.AutoField(primary_key=True)
    nombre_departamento = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'departamento'

    def __str__(self):
        return self.nombre_departamento



class Municipio(models.Model):
    id_municipio = models.AutoField(primary_key=True)
    nombre_municipio = models.CharField(max_length=50)

    id_departamento = models.ForeignKey(
        Departamento,
        on_delete=models.RESTRICT,
        db_column='id_departamento'
    )

    class Meta:
        managed = False
        db_table = 'municipio'


class Suppliers(models.Model):
    nit = models.CharField(max_length=20, unique=True)
    nombre_proveedor = models.CharField(max_length=50)
    razon_social = models.CharField(max_length=255, unique=True)
    direccion = models.CharField(max_length=150)
    correo_contacto = models.EmailField(max_length=100)
    telefono_contacto = models.CharField(max_length=10)
    estado = models.BooleanField(default=True)  # True = Activo, False = Inactivo
    nombre_contacto = models.CharField(max_length=50)
    id_departamento = models.ForeignKey(
        Departamento,
        on_delete=models.RESTRICT,  # evita borrar departamentos en uso
        db_column='id_departamento'
    )
    id_municipio = models.ForeignKey(
        Municipio,
        on_delete=models.RESTRICT,
        db_column='id_municipio'
    )

    def __str__(self):
        return f"{self.nombre_proveedor} - {self.nit}"

    class Meta:
        managed = False
        db_table = 'proveedores'
