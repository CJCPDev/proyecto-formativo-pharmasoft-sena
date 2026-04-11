
# # Configuración de las URLs de la app products.
# # DefaultRouter genera automáticamente las rutas REST estándar para cada ViewSet:
# # GET /recurso/        -> listar todos
# # POST /recurso/       -> crear uno nuevo
# # GET /recurso/{id}/   -> obtener uno por id
# # PUT /recurso/{id}/   -> actualizar uno por id
# # DELETE /recurso/{id}/ -> eliminar uno por id

# from rest_framework.routers import DefaultRouter
# from django.urls import path
# from .views import actualizar_estado
# from .views import SubformaFarmaceuticaViewSet
# from .views import (
#     MedicamentosViewSet,
#     FormaFarmaceuticaViewSet,
#     ViaAdministracionViewSet,
#     LaboratoriosViewSet,
#     ProveedoresViewSet,
#     EstadoMedicamentoViewSet,
#     ConcentracionViewSet,
# )

# # El router construye y agrupa todas las URLs automáticamente
# router = DefaultRouter()

# # Cada register vincula un prefijo de URL con su ViewSet correspondiente
# router.register(r'medicamentos', MedicamentosViewSet)
# router.register(r'formas-farmaceuticas', FormaFarmaceuticaViewSet)
# router.register(r'vias-administracion', ViaAdministracionViewSet)
# router.register(r'laboratorios', LaboratoriosViewSet)
# router.register(r'proveedores', ProveedoresViewSet)
# router.register(r'estados-medicamento', EstadoMedicamentoViewSet)
# router.register(r'concentraciones', ConcentracionViewSet)

# # Se pasa basename explícito porque SubformaFarmaceuticaViewSet usa un queryset
# # filtrado dinámicamente y el router no puede inferir el nombre base automáticamente
# router.register(r'subformas-farmaceuticas', SubformaFarmaceuticaViewSet, basename='subformas-farmaceuticas')

# urlpatterns = [
#     path('medicamentos/<int:id_medicamento>/estado', actualizar_estado),
# ]
# # Exponemos las URLs generadas por el router para que Django las incluya en el proyecto
# urlpatterns = router.urls
# Configuración de las URLs de la app products.
# Aquí combinamos dos cosas:
# 1. Las rutas automáticas que genera el DefaultRouter para cada ViewSet (CRUD estándar).
# 2. La ruta personalizada para actualizar el estado de un medicamento.

from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import actualizar_estado
from .views import SubformaFarmaceuticaViewSet
from .views import (
    MedicamentosViewSet,
    FormaFarmaceuticaViewSet,
    ViaAdministracionViewSet,
    LaboratoriosViewSet,
    ProveedoresViewSet,
    EstadoMedicamentoViewSet,
    ConcentracionViewSet,
)

# El router construye automáticamente las rutas REST estándar para cada ViewSet.
# Ejemplo: /medicamentos/ → listar, crear
#          /medicamentos/{id}/ → obtener, actualizar, eliminar
router = DefaultRouter()

# Registramos cada modelo con su ViewSet correspondiente.
router.register(r'medicamentos', MedicamentosViewSet)
router.register(r'formas-farmaceuticas', FormaFarmaceuticaViewSet)
router.register(r'vias-administracion', ViaAdministracionViewSet)
router.register(r'laboratorios', LaboratoriosViewSet)
router.register(r'proveedores', ProveedoresViewSet)
router.register(r'estados-medicamento', EstadoMedicamentoViewSet)
router.register(r'concentraciones', ConcentracionViewSet)

# SubformaFarmaceutica usa un queryset dinámico, por eso le damos basename explícito.
router.register(
    r'subformas-farmaceuticas',
    SubformaFarmaceuticaViewSet,
    basename='subformas-farmaceuticas'
)

# Aquí definimos nuestra ruta personalizada para actualizar el estado de un medicamento.
# Endpoint: PUT /medicamentos/{id_medicamento}/estado
urlpatterns = [
    path('medicamentos/<int:id_medicamento>/estado', actualizar_estado),
]

# Finalmente, añadimos las rutas generadas por el router a urlpatterns.
# Usamos "+=" para extender, no "=" para evitar sobrescribir la ruta personalizada.
urlpatterns += router.urls
