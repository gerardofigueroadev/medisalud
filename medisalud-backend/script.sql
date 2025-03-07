CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    email VARCHAR(255),
    nit VARCHAR(50)
);

CREATE TABLE compra (
    id_compra SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES cliente(id_cliente),
    fecha_compra DATE,
    total DECIMAL(10,2),
    estado VARCHAR(50)
);

CREATE TABLE factura (
    id_factura SERIAL PRIMARY KEY,
    id_compra INT UNIQUE REFERENCES compra(id_compra),
    nro_factura VARCHAR(50),
    fecha_emision DATE,
    monto_total DECIMAL(10,2),
    estado VARCHAR(50)
);

CREATE TABLE tipo_medidor (
    id_tipo_medidor SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(255)
);

CREATE TABLE medidor (
    id_medidor SERIAL PRIMARY KEY,
    id_tipo_medidor INT REFERENCES tipo_medidor(id_tipo_medidor),
    numero_serie VARCHAR(50),
    marca VARCHAR(50),
    modelo VARCHAR(50),
    estado VARCHAR(50),
    sistema_seguridad BOOLEAN,
    fecha_fabricacion DATE,
    fecha_calibracion DATE,
    valores_calibracion VARCHAR(255)
);

CREATE TABLE detalle_compra (
    id_detalle_compra SERIAL PRIMARY KEY,
    id_compra INT REFERENCES compra(id_compra),
    id_medidor INT REFERENCES medidor(id_medidor),
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2)
);

CREATE TABLE precio (
    id_precio SERIAL PRIMARY KEY,
    id_tipo_medidor INT REFERENCES tipo_medidor(id_tipo_medidor),
    sistema_seguridad BOOLEAN,
    valor_usd DECIMAL(10,2),
    fecha_vigencia DATE,
    estado VARCHAR(50)
);

CREATE TABLE servicio (
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(255),
    precio_usd DECIMAL(10,2),
    estado VARCHAR(50)
);

CREATE TABLE detalle_servicio (
    id_detalle_servicio SERIAL PRIMARY KEY,
    id_servicio INT REFERENCES servicio(id_servicio),
    id_compra INT REFERENCES compra(id_compra),
    id_medidor INT REFERENCES medidor(id_medidor),
    precio DECIMAL(10,2),
    observaciones VARCHAR(255)
);

CREATE TABLE importacion (
    id_importacion SERIAL PRIMARY KEY,
    nro_importacion VARCHAR(50),
    fecha_importacion DATE,
    proveedor VARCHAR(255),
    costo_total DECIMAL(10,2),
    estado VARCHAR(50)
);

CREATE TABLE detalle_importacion (
    id_detalle_importacion SERIAL PRIMARY KEY,
    id_importacion INT REFERENCES importacion(id_importacion),
    id_tipo_medidor INT REFERENCES tipo_medidor(id_tipo_medidor),
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2)
);

CREATE TABLE historial_calibracion (
    id_historial SERIAL PRIMARY KEY,
    id_medidor INT REFERENCES medidor(id_medidor),
    fecha_calibracion DATE,
    resultado VARCHAR(255),
    valores_calibracion VARCHAR(255),
    observaciones VARCHAR(255),
    tecnico_responsable VARCHAR(255)
);

CREATE TABLE historial_manipulacion (
    id_historial_manipulacion SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES cliente(id_cliente),
    id_medidor INT REFERENCES medidor(id_medidor),
    fecha_deteccion DATE,
    numero_incidencia INT,
    observaciones VARCHAR(255)
);

-- Insertando datos en la tabla cliente
INSERT INTO cliente (nombre, apellido, direccion, telefono, email, nit) VALUES
('Juan', 'Pérez', 'Calle 123', '789456123', 'juan.perez@example.com', '123456789'),
('María', 'González', 'Avenida 456', '789456124', 'maria.gonzalez@example.com', '987654321');

-- Insertando datos en la tabla compra
INSERT INTO compra (id_cliente, fecha_compra, total, estado) VALUES
(1, '2025-03-01', 150.00, 'Pagado'),
(2, '2025-03-02', 200.00, 'Pendiente');

-- Insertando datos en la tabla factura
INSERT INTO factura (id_compra, nro_factura, fecha_emision, monto_total, estado) VALUES
(1, 'F001-0001', '2025-03-01', 150.00, 'Emitida'),
(2, 'F001-0002', '2025-03-02', 200.00, 'Pendiente');

-- Insertando datos en la tabla tipo_medidor
INSERT INTO tipo_medidor (nombre, descripcion) VALUES
('Monofásico', 'Medidor de energía monofásico'),
('Bifásico', 'Medidor de energía bifásico'),
('Trifásico', 'Medidor de energía trifásico');

-- Insertando datos en la tabla medidor
INSERT INTO medidor (id_tipo_medidor, numero_serie, marca, modelo, estado, sistema_seguridad, fecha_fabricacion, fecha_calibracion, valores_calibracion) VALUES
(1, 'A123456', 'Siemens', 'X100', 'Nuevo', TRUE, '2024-01-01', '2025-02-01', '0.99'),
(2, 'B654321', 'ABB', 'Z200', 'Calibrado', FALSE, '2023-05-10', '2025-02-15', '0.98');

-- Insertando datos en la tabla precio
INSERT INTO precio (id_tipo_medidor, sistema_seguridad, valor_usd, fecha_vigencia, estado) VALUES
(1, TRUE, 120.00, '2025-01-01', 'Vigente'),
(2, FALSE, 110.00, '2025-02-01', 'Vigente');

-- Insertando datos en la tabla servicio
INSERT INTO servicio (nombre, descripcion, precio_usd, estado) VALUES
('Revisión', 'Revisión general del medidor', 50.00, 'Disponible'),
('Calibración', 'Calibración del medidor', 80.00, 'Disponible');

-- Insertando datos en la tabla detalle_compra
INSERT INTO detalle_compra (id_compra, id_medidor, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 2, 120.00, 240.00),
(2, 2, 1, 110.00, 110.00);

-- Insertando datos en la tabla detalle_servicio
INSERT INTO detalle_servicio (id_servicio, id_compra, id_medidor, precio, observaciones) VALUES
(1, 1, 1, 50.00, 'Revisión inicial'),
(2, 2, 2, 80.00, 'Calibración anual');

-- Insertando datos en la tabla importacion
INSERT INTO importacion (nro_importacion, fecha_importacion, proveedor, costo_total, estado) VALUES
('IMP-2025-001', '2025-01-10', 'Proveedor X', 5000.00, 'Completado');

-- Insertando datos en la tabla detalle_importacion
INSERT INTO detalle_importacion (id_importacion, id_tipo_medidor, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 10, 100.00, 1000.00);

-- Insertando datos en la tabla historial_calibracion
INSERT INTO historial_calibracion (id_medidor, fecha_calibracion, resultado, valores_calibracion, observaciones, tecnico_responsable) VALUES
(1, '2025-02-01', 'Aprobado', '0.99', 'Sin anomalías', 'Técnico A');

-- Insertando datos en la tabla historial_manipulacion
INSERT INTO historial_manipulacion (id_cliente, id_medidor, fecha_deteccion, numero_incidencia, observaciones) VALUES
(1, 2, '2025-03-01', 101, 'Posible manipulación detectada.');