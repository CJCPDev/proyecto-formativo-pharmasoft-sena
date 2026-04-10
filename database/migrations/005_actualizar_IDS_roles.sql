-- Desactivar verificación de llaves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Actualizar el ID de los roles
UPDATE roles SET id_rol = 1 WHERE nombre_rol = 'Administrador';
UPDATE roles SET id_rol = 2 WHERE nombre_rol = 'Cliente';
UPDATE roles SET id_rol = 3 WHERE nombre_rol = 'Farmaceuta';

-- Actualizar los usuarios que tienen esos roles
UPDATE usuarios SET id_rol = 1 WHERE id_rol = 5;
UPDATE usuarios SET id_rol = 2 WHERE id_rol = 6;
UPDATE usuarios SET id_rol = 3 WHERE id_rol = 7;

-- Reactivar verificación de llaves foráneas
SET FOREIGN_KEY_CHECKS = 1;