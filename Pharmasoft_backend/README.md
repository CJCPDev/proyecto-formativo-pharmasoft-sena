## Dependencia sa instalar para correr el backend

pip install dotenv
pip install bcrypt
crear el env con la informacion de la base de datos 

# Tablas Users

# CREATE TABLE usuarios ( id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY, nombres VARCHAR(50) NOT NULL, apellidos VARCHAR(50) NOT NULL,numero_documento INT NOT NULL, correo_electronico VARCHAR(100) NOT NULL UNIQUE, numero_telefono BIGINT NOT NULL, direccion VARCHAR(150) NOT NULL, file TEXT NULL, contrasena VARCHAR(255) NULL, id_documento INT NULL, id_rol INT NULL, id_estado_usuario INT NULL);

# CREATE TABLE estado_usuario (id_estado_usuario INT AUTO_INCREMENT PRIMARY KEY, nombre_estado_usuario VARCHAR(150) NOT NULL);

# CREATE TABLE roles (id_rol INT AUTO_INCREMENT PRIMARY KEY,nombre_rol VARCHAR(150) NOT NULL);

# CREATE TABLE tipo_documento (id_documento INT AUTO_INCREMENT PRIMARY KEY,nombre_tipo_documento VARCHAR(100) NOT NULL);

# ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_tipo_documento FOREIGN KEY (id_documento) REFERENCES tipo_documento(id_documento) ON DELETE SET NULL ON UPDATE CASCADE;

# ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_roles FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE SET NULL ON UPDATE CASCADE;

# ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_estado_usuario FOREIGN KEY (id_estado_usuario) REFERENCES estado_usuario(id_estado_usuario) ON DELETE SET NULL ON UPDATE CASCADE;

# --------------------------------------------------------------------------------------------------------------------------------------#
# Tablas Suppliers


# --------------------------------------------------------------------------------------------------------------------------------------#
# Tablas Sales


# --------------------------------------------------------------------------------------------------------------------------------------#
# Tablas Carrito de compras



# --------------------------------------------------------------------------------------------------------------------------------------#
# Tablas products

