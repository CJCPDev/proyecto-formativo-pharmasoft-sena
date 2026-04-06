-- ─────────────────────────────────────────────
-- Migración 002
-- Agrega el campo id_usuario a la tabla carrito_compra
-- Fecha: 2026-04-01
-- Autor: Luis
-- ─────────────────────────────────────────────

ALTER TABLE carrito_compra ADD COLUMN id_usuario INT(11) NOT NULL AFTER id_carrito;
ALTER TABLE carrito_compra ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_tipo_usuario);