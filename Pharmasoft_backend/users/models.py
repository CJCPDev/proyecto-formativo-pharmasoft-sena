# ─────────────────────────────────────────────
# users/models.py
# Modelos del módulo de usuarios
# ─────────────────────────────────────────────

from django.db import models


class EstadoUsuario(models.Model):
    id_estado_usuario = models.AutoField(primary_key=True)
    nombre_estado_usuario = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'estado_usuario'


class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'roles'


class TipoDocumento(models.Model):
    id_documento = models.AutoField(primary_key=True)
    nombre_tipo_documento = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'tipo_documento'


class Usuarios(models.Model):
    id_tipo_usuario = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    numero_documento = models.IntegerField()
    correo_electronico = models.CharField(unique=True, max_length=100)
    numero_telefono = models.BigIntegerField()
    direccion = models.CharField(max_length=150)
    file = models.TextField(blank=True, null=True)
    contrasena = models.CharField(max_length=255, blank=True, null=True)
    id_documento = models.ForeignKey(TipoDocumento, models.DO_NOTHING, db_column='id_documento', blank=True, null=True)
    id_rol = models.ForeignKey(Roles, models.DO_NOTHING, db_column='id_rol', blank=True, null=True)
    id_estado_usuario = models.ForeignKey(EstadoUsuario, models.DO_NOTHING, db_column='id_estado_usuario', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'


class Permisos(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    codigo = models.CharField(unique=True, max_length=100)
    nombre = models.CharField(max_length=150)
    modulo = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'permisos'


class RolPermisos(models.Model):
    id_rol = models.ForeignKey(Roles, models.DO_NOTHING, db_column='id_rol')
    id_permiso = models.ForeignKey(Permisos, models.DO_NOTHING, db_column='id_permiso')

    class Meta:
        managed = False
        db_table = 'rol_permisos'


class UsuarioPermisos(models.Model):
    id_usuario = models.ForeignKey(Usuarios, models.DO_NOTHING, db_column='id_usuario')
    id_permiso = models.ForeignKey(Permisos, models.DO_NOTHING, db_column='id_permiso')

    class Meta:
        managed = False
        db_table = 'usuario_permisos'

class CarritoCompra(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(
        Usuarios,
        models.DO_NOTHING,
        db_column='id_usuario'
    )
    id_medicamento = models.IntegerField(blank=True, null=True)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=50)
    id_factura = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'carrito_compra'