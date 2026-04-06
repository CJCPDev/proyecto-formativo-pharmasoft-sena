from django.contrib import admin
from suppliers.models import Suppliers, Municipio, Departamento


admin.site.register(Municipio)
admin.site.register(Departamento)
@admin.register(Suppliers)
class SupplierAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'nit',
        'nombre_proveedor',
        'razon_social',
        'correo_contacto',
        'telefono_contacto',
        'estado',
        'id_municipio',
        'get_departamento',
        
    )

    def get_departamento(self, obj):
        return obj.id_municipio.id_departamento.nombre_departamento

    get_departamento.short_description = 'Departamento'

    search_fields = ('nit', 'nombre_proveedor', 'razon_social')
    list_filter = ('estado',)