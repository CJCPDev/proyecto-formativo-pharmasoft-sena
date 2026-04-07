from django.contrib import admin

# Register your models here.
from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import FormaFarmaceutica, ViaAdministracion, Laboratorios, Proveedores, EstadoMedicamento, Medicamentos

admin.site.register(Medicamentos)
admin.site.register(FormaFarmaceutica)
admin.site.register(ViaAdministracion)
admin.site.register(Laboratorios)
admin.site.register(Proveedores)
admin.site.register(EstadoMedicamento)
