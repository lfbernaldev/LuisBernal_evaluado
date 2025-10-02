-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS evaluacion_luisbernal_evaluado;
USE evaluacion_luisbernal_evaluado;

-- Crear tabla EstadoUsuario
CREATE TABLE EstadoUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    clave VARCHAR(50) NOT NULL
);

-- Insertar datos iniciales en EstadoUsuario
INSERT INTO EstadoUsuario (id, titulo, clave) VALUES
(1, 'Activo', 'activo'),
(2, 'Baja Permanente', 'baja');

-- Crear tabla usuario
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    fecha_creacion DATE NOT NULL,
    EstadoUsuarioId INT NOT NULL ,
    FOREIGN KEY (EstadoUsuarioId) REFERENCES EstadoUsuario(id)
);
