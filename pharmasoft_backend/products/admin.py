from django.contrib import admin
from .models import (
    Medicamentos,
    FormaFarmaceutica,
    ViaAdministracion,
    Laboratorios,
    EstadoMedicamento,
    Proveedores,
    Concentracion
)

@admin.register(Medicamentos)
class MedicamentosAdmin(admin.ModelAdmin):

    # Columnas visibles en el listado de medicamentos
    list_display = (
        "id_medicamento",
        "nombre_medicamento",
        "lote",
        "fecha_fabricacion",
        "fecha_vencimiento",
        "stock",
        "precio_compra",
        "precio_venta",
        "requiere_formula",
        "descripcion",
        "concentracion",
        "id_forma_farmaceutica",
        "id_via_administracion",
        "id_laboratorio",
        "id_estado",
        "id_proveedor",
        "mostrar_imagen",  # Columna generada por el método personalizado de abajo
    )

    # Campos por los que se puede buscar desde la barra de búsqueda del admin
    search_fields = ("nombre_medicamento", "lote", "descripcion")

    # Filtros laterales para acotar el listado por estos campos
    list_filter = (
        "requiere_formula",
        "id_estado",
        "id_laboratorio",
        "id_proveedor",
        "fecha_fabricacion",
        "fecha_vencimiento",
    )

    # Orden por defecto del listado: alfabético por nombre
    ordering = ("nombre_medicamento",)

    # Campos editables directamente desde el listado sin entrar al detalle
    list_editable = ("stock", "precio_venta")

    # Método personalizado que muestra la URL de la imagen en el listado.
    # Si el medicamento no tiene imagen muestra el texto "Sin imagen".
    def mostrar_imagen(self, obj):
        if obj.imagen:
            return obj.imagen.url
        return "Sin imagen"

    # Texto del encabezado de la columna generada por este método
    mostrar_imagen.short_description = "Imagen"


@admin.register(FormaFarmaceutica)
class FormaFarmaceuticaAdmin(admin.ModelAdmin):
    # Muestra el id y el nombre en el listado, permite buscar por nombre
    list_display = ("id_forma_farmaceutica", "nombre_forma_farmaceutica")
    search_fields = ("nombre_forma_farmaceutica",)


@admin.register(ViaAdministracion)
class ViaAdministracionAdmin(admin.ModelAdmin):
    list_display = ("id_via_administracion", "nombre_via_administracion")
    search_fields = ("nombre_via_administracion",)


@admin.register(Laboratorios)
class LaboratoriosAdmin(admin.ModelAdmin):
    list_display = ("id_laboratorio", "nombre_laboratorio")
    search_fields = ("nombre_laboratorio",)


@admin.register(EstadoMedicamento)
class EstadoMedicamentoAdmin(admin.ModelAdmin):
    list_display = ("id_estado", "nombre_estado")
    search_fields = ("nombre_estado",)


@admin.register(Proveedores)
class ProveedoresAdmin(admin.ModelAdmin):
    # Se usa "id" en lugar de "id_proveedor" porque el modelo Proveedores
    # hereda el campo id automático de Django en vez de definir uno propio
    list_display = ("id", "nombre_proveedor")
    search_fields = ("nombre_proveedor",)


@admin.register(Concentracion)
class ConcentracionAdmin(admin.ModelAdmin):
    list_display = ("id_concentracion", "nombre_tipo_concentracion")
    search_fields = ("nombre_tipo_concentracion",)