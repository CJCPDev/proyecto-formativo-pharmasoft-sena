# Definición de los modelos de la base de datos para el módulo de medicamentos.
# Cada clase representa una tabla en la base de datos.

from django.db import models


# Tabla de formas farmacéuticas (ej: tableta, jarabe, cápsula)
class FormaFarmaceutica(models.Model):
    id_forma_farmaceutica = models.AutoField(primary_key=True)
    nombre_forma_farmaceutica = models.CharField(max_length=255)

    class Meta:
        db_table = 'forma_farmaceutica'  # Nombre exacto de la tabla en la base de datos

    def __str__(self):
        return self.nombre_forma_farmaceutica  # Texto que aparece en el admin y en consola


# Tabla de vías de administración (ej: oral, intravenosa, tópica)
class ViaAdministracion(models.Model):
    id_via_administracion = models.AutoField(primary_key=True)
    nombre_via_administracion = models.CharField(max_length=255)

    class Meta:
        db_table = 'via_administracion'

    def __str__(self):
        return self.nombre_via_administracion


# Tabla de laboratorios fabricantes de medicamentos
class Laboratorios(models.Model):
    id_laboratorio = models.AutoField(primary_key=True)
    nombre_laboratorio = models.CharField(max_length=255)

    class Meta:
        db_table = 'laboratorios'

    def __str__(self):
        return self.nombre_laboratorio


# Tabla de estados posibles de un medicamento (ej: activo, inactivo, vencido)
class EstadoMedicamento(models.Model):
    id_estado = models.AutoField(primary_key=True)
    nombre_estado = models.CharField(max_length=50)

    class Meta:
        db_table = 'estado_medicamento'

    def __str__(self):
        return self.nombre_estado


# Tabla de proveedores que distribuyen los medicamentos.
# Usa "id" en lugar de "id_proveedor" porque hereda la clave primaria automática de Django.
class Proveedores(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_proveedor = models.CharField(max_length=255)

    class Meta:
        db_table = 'proveedores'

    def __str__(self):
        return self.nombre_proveedor


# Tabla de tipos de concentración (ej: mg, ml, UI)
class Concentracion(models.Model):
    id_concentracion = models.AutoField(primary_key=True)
    nombre_tipo_concentracion = models.CharField(max_length=50)

    class Meta:
        db_table = 'concentracion'

    def __str__(self):
        return self.nombre_tipo_concentracion


# Tabla de subformas farmacéuticas, que dependen de una forma farmacéutica.
# Ejemplo: si la forma es "tableta", las subformas pueden ser "masticable" o "efervescente".
class SubformaFarmaceutica(models.Model):
    id_subforma_farmaceutica = models.AutoField(primary_key=True)
    nombre_subforma_farmaceutica = models.CharField(max_length=100)

    # Relación con FormaFarmaceutica: una subforma pertenece a una forma farmacéutica.
    # DO_NOTHING evita que Django elimine las subformas si se borra la forma padre.
    id_forma_farmaceutica = models.ForeignKey(
        FormaFarmaceutica,
        on_delete=models.DO_NOTHING,
        db_column='id_forma_farmaceutica',
        null=True,   # Permite que el campo sea nulo en la base de datos
        blank=True   # Permite que el campo esté vacío en formularios del admin
    )

    class Meta:
        db_table = 'subforma_farmaceutica'

    def __str__(self):
        return self.nombre_subforma_farmaceutica


# Tabla principal de medicamentos con todos sus atributos y relaciones.
class Medicamentos(models.Model):
    id_medicamento = models.AutoField(primary_key=True)
    nombre_medicamento = models.CharField(max_length=50)
    lote = models.CharField(max_length=50)
    fecha_fabricacion = models.DateField()
    fecha_vencimiento = models.DateField()
    stock = models.CharField(max_length=20)

    # Precios con hasta 10 dígitos en total y 2 decimales (ej: 99999999.99)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)

    # Solo acepta los valores "Si" o "No", mostrados como "Sí" y "No" en el admin
    requiere_formula = models.CharField(
        max_length=2,
        choices=[("Si", "Sí"), ("No", "No")]
    )

    descripcion = models.CharField(max_length=255)

    # La concentración es opcional: puede estar vacía, por eso tiene blank=True y default=''
    concentracion = models.CharField(max_length=50, blank=True, default='')

    # La imagen se guarda en la carpeta medicamentos/ dentro de MEDIA_ROOT.
    # Es opcional: un medicamento puede no tener imagen.
    imagen = models.ImageField(upload_to='medicamentos/', null=True, blank=True)

    # Relaciones con otras tablas mediante claves foráneas.
    # Todas usan DO_NOTHING para no afectar los medicamentos si se elimina un registro relacionado.
    # null=True y blank=True permiten que el campo sea opcional.
    id_forma_farmaceutica = models.ForeignKey(
        FormaFarmaceutica,
        on_delete=models.DO_NOTHING,
        db_column='id_forma_farmaceutica',
        null=True,
        blank=True
    )
    id_subforma_farmaceutica = models.ForeignKey(
        SubformaFarmaceutica,
        on_delete=models.DO_NOTHING,
        db_column='id_subforma_farmaceutica',
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