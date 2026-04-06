-- ─────────────────────────────────────────────
-- Migración 001
-- Agrega el campo contrasena a la tabla usuarios
-- Fecha: 2026-03-31
-- Autor: Luis
-- ─────────────────────────────────────────────

ALTER TABLE usuarios ADD COLUMN contrasena VARCHAR(255) NULL;