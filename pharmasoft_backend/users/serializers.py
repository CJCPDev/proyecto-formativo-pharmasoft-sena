# ─────────────────────────────────────────────
# users/serializers.py
# Serializers del módulo de usuarios
# Convierte los datos entre el formato de la BD
# y los nombres que usa React en el frontend
# ─────────────────────────────────────────────

from rest_framework import serializers
from .models import Usuarios, Roles, TipoDocumento, EstadoUsuario, Permisos, RolPermisos, UsuarioPermisos, CarritoCompra


class UsuarioSerializer(serializers.ModelSerializer):

    name               = serializers.SerializerMethodField()
    userEmail          = serializers.CharField(source='correo_electronico')
    phone              = serializers.CharField(source='numero_telefono')
    documentNumber     = serializers.IntegerField(source='numero_documento')
    direccion          = serializers.CharField()
    avatarUrl          = serializers.SerializerMethodField()
    documentType       = serializers.IntegerField(source='id_documento_id', required=False, allow_null=True)
    documentTypeNombre = serializers.CharField(source='id_documento.nombre_tipo_documento', read_only=True)
    userGroup          = serializers.IntegerField(source='id_rol_id', required=False, allow_null=True)
    userGroupNombre    = serializers.CharField(source='id_rol.nombre_rol', read_only=True)
    estado             = serializers.IntegerField(source='id_estado_usuario_id', read_only=True)

    class Meta:
        model = Usuarios
        fields = [
            'id_tipo_usuario',
            'name',
            'userEmail',
            'phone',
            'documentType',
            'documentTypeNombre',
            'documentNumber',
            'userGroup',
            'userGroupNombre',
            'direccion',
            'avatarUrl',
            'estado',
            'contrasena',
        ]

    def get_name(self, obj):
        return f"{obj.nombres} {obj.apellidos}"

    def get_avatarUrl(self, obj):
        if not obj.file:
            return None
        url = str(obj.file).strip("b'\"")
        return url

    def to_internal_value(self, data):
        internal = super().to_internal_value(data)
        if 'name' in data:
            partes = data['name'].strip().split(' ', 1)
            internal['nombres'] = partes[0]
            internal['apellidos'] = partes[1] if len(partes) > 1 else ''
        if 'avatarUrl' in data and data['avatarUrl']:
            internal['file'] = data['avatarUrl']
        if 'contrasena' in data and data['contrasena']:
            internal['contrasena'] = data['contrasena']
        return internal

    def create(self, validated_data):
        from users.auth import encriptar_contrasena

        # Asignamos estado activo por defecto
        validated_data['id_estado_usuario_id'] = 1

        # Si es administrador o farmaceuta la contraseña inicial es el número de docuemnto
        roles_con_contrasena_inicial = [1,3]
        id_rol = validated_data.get('id_rol_id')

        if id_rol in roles_con_contrasena_inicial:
            numero_documento = validated_data.get('numero_documento')
            # Enxriptamos el número de documento como contraseña inicial
            validated_data['contrasena'] = encriptar_contrasena(str(numero_documento))

        if id_rol == 2:
            contrasena = validated_data.pop('contrasena', None)
            if contrasena:
                validated_data['contrasena'] = encriptar_contrasena(contrasena)

        # Creamos el usuario
        usuario = Usuarios.objects.create(**validated_data)

        # Copiamos automáticamente los permisos del rol
        if usuario.id_rol_id:
            # Obtenemos los permisos del rol
            permisos_rol = RolPermisos.objects.filter(id_rol=usuario.id_rol_id)

            # Creamos los permisos del usuario basados en los del rol
            for permiso in permisos_rol:
                UsuarioPermisos.objects.create(
                    id_usuario_id=usuario.id_tipo_usuario,
                    id_permiso_id=permiso.id_permiso_id
                )

        return usuario

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class TipoDocumentoSerializer(serializers.ModelSerializer):
    value = serializers.IntegerField(source='id_documento')
    label = serializers.CharField(source='nombre_tipo_documento')

    class Meta:
        model = TipoDocumento
        fields = ['value', 'label']


class RolSerializer(serializers.ModelSerializer):
    value = serializers.IntegerField(source='id_rol')
    label = serializers.CharField(source='nombre_rol')

    class Meta:
        model = Roles
        fields = ['value', 'label']


class PermisoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Permisos
        fields = ['id_permiso', 'codigo', 'nombre', 'modulo']


class RolPermisoSerializer(serializers.ModelSerializer):
    codigo     = serializers.CharField(source='id_permiso.codigo')
    nombre     = serializers.CharField(source='id_permiso.nombre')
    modulo     = serializers.CharField(source='id_permiso.modulo')
    id_permiso = serializers.IntegerField(source='id_permiso.id_permiso')

    class Meta:
        model = RolPermisos
        fields = ['id', 'id_permiso', 'codigo', 'nombre', 'modulo']


class UsuarioPermisoSerializer(serializers.ModelSerializer):
    codigo     = serializers.CharField(source='id_permiso.codigo')
    nombre     = serializers.CharField(source='id_permiso.nombre')
    modulo     = serializers.CharField(source='id_permiso.modulo')
    id_permiso = serializers.IntegerField(source='id_permiso.id_permiso')

    class Meta:
        model = UsuarioPermisos
        fields = ['id', 'id_permiso', 'codigo', 'nombre', 'modulo']

class CarritoCompraSerializer(serializers.ModelSerializer):

    nombre_medicamento = serializers.SerializerMethodField()
    imagen_medicamento = serializers.SerializerMethodField()
    nombre_cliente = serializers.SerializerMethodField()
    nombre_aprobado_por = serializers.SerializerMethodField()
    documento_cliente = serializers.SerializerMethodField()
    class Meta:
        model = CarritoCompra
        fields = '__all__'

    def get_nombre_medicamento(self, obj):
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT nombre_medicamento FROM medicamentos WHERE id_medicamento = %s",
                    [obj.id_medicamento]
                )
                row = cursor.fetchone()
                return row[0] if row else f"Medicamento #{obj.id_medicamento}"
        except Exception:
            return f"Medicamento #{obj.id_medicamento}"
        
    def get_imagen_medicamento(self, obj):
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT imagen FROM medicamentos WHERE id_medicamento = %s",
                    [obj.id_medicamento]
                )
                row = cursor.fetchone()
                return row[0] if row else None
        except Exception:
            return None
        
    def get_nombre_cliente(self, obj):
        try:
            return f"{obj.id_usuario.nombres} {obj.id_usuario.apellidos}"
        except Exception:
            return f"Usuario #{obj.id_usuario_id}"
        
    def get_documento_cliente(self, obj):
        try:
            return str(obj.id_usuario.numero_documento)
        except Exception:
            return ""
    
    def get_nombre_aprobado_por(self, obj):
        try:
            if obj.aprobado_por:
                return f"{obj.aprobado_por.nombres} {obj.aprobado_por.apellidos}"
            return "Sin aprobar"
        except Exception:
            return "Sin aprobar"