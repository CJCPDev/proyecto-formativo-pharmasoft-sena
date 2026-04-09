# Migraciones de Base de Datos

Esta carpeta contiene los scripts SQL para actualizar la base de datos.

## ¿Cómo aplicar una migración?

1. Abre phpMyAdmin o la terminal de MariaDB
2. Selecciona la BD `pharmasoft`
3. Ejecuta el script SQL del archivo correspondiente

## Migraciones disponibles

| # | Archivo | Descripción | Fecha |
| 001 | 001_agregar_campo_contrasena.sql | Agrega campo contrasena a usuarios | 2026-03-31 |
| 002 | 002_agregar_id_usuario_carrito.sql | Agrega campo id_usuario a carrito_venta | 2026-04-01 |
| 003 | 003_agregar_aprobado_por_carrito.sql | Agrega campo aprobado_por a carrito_compra | 2026-04-06 |