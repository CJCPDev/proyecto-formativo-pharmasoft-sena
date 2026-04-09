from django.db import models

class FormaFarmaceutica(models.Model):
    id_forma_farmaceutica = models.AutoField(primary_key=True)
    nombre_forma_farmaceutica = models.CharField(max_length=255)

    class Meta:
        db_table = 'forma_farmaceutica'

    def __str__(self):
        return self.nombre_forma_farmaceutica


class ViaAdministracion(models.Model):
    id_via_administracion = models.AutoField(primary_key=True)
    nombre_via_administracion = models.CharField(max_length=255)

    class Meta:
        db_table = 'via_administracion'

    def __str__(self):
        return self.nombre_via_administracion


class Laboratorios(models.Model):
    id_laboratorio = models.AutoField(primary_key=True)
    nombre_laboratorio = models.CharField(max_length=255)

    class Meta:
        db_table = 'laboratorios'

    def __str__(self):
        return self.nombre_laboratorio


class EstadoMedicamento(models.Model):
    id_estado = models.AutoField(primary_key=True)
    nombre_estado = models.CharField(max_length=50)

    class Meta:
        db_table = 'estado_medicamento'

    def __str__(self):
        return self.nombre_estado


class Proveedores(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre_proveedor = models.CharField(max_length=255)

    class Meta:
        db_table = 'proveedores'

    def __str__(self):
        return self.nombre_proveedor


class Concentracion(models.Model):
    id_concentracion = models.AutoField(primary_key=True)
    nombre_tipo_concentracion = models.CharField(max_length=50)

    class Meta:
        db_table = 'concentracion'

    def __str__(self):
        return self.nombre_tipo_concentracion


class Medicamentos(models.Model):
    id_medicamento = models.AutoField(primary_key=True)
    nombre_medicamento = models.CharField(max_length=50)
    lote = models.CharField(max_length=50)
    fecha_fabricacion = models.DateField()
    fecha_vencimiento = models.DateField()
    stock = models.CharField(max_length=20)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    requiere_formula = models.CharField(
        max_length=2,
        choices=[("Si", "Sí"), ("No", "No")]
    )
    descripcion = models.CharField(max_length=255)
    concentracion = models.CharField(max_length=50, blank=True, default='')
    imagen = models.ImageField(upload_to='medicamentos/', null=True, blank=True)  # 🔥 nuevo campo

    id_forma_farmaceutica = models.ForeignKey(
        FormaFarmaceutica,
        on_delete=models.DO_NOTHING,
        db_column='id_forma_farmaceutica',
        null=True,
        blank=True
    )
    id_via_administracion = models.ForeignKey(
        ViaAdministracion,
        on_delete=models.DO_NOTHING,
        db_column='id_via_administracion',
        null=True,
        blank=True
    )
    id_laboratorio = models.ForeignKey(
        Laboratorios,
        on_delete=models.DO_NOTHING,
        db_column='id_laboratorio',
        null=True,
        blank=True
    )
    id_estado = models.ForeignKey(
        EstadoMedicamento,
        on_delete=models.DO_NOTHING,
        db_column='id_estado',
        null=True,
        blank=True
    )
    id_proveedor = models.ForeignKey(
        Proveedores,
        on_delete=models.DO_NOTHING,
        db_column='id_proveedor',
        null=True,
        blank=True
    )

    class Meta:
        db_table = 'medicamentos'

    def __str__(self):
        return self.nombre_medicamento
