-- ─────────────────────────────────────────────
-- Migración 002
-- Agrega el campo aprobado por y lo combierte en lleva foranea en la tabla de carrito de compra
-- Fecha: 2026-04-06
-- Autor: Luis
-- ─────────────────────────────────────────────

ALTER TABLE carrito_compra ADD COLUMN aprobado_por INT(11) NULL;

ALTER TABLE carrito_compra ADD FOREIGN KEY (aprobado_por) REFERENCES usuarios (id_tipo_usuario)

