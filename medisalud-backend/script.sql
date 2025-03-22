CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password_hash VARCHAR(255),
    nombre VARCHAR(255),
    rol VARCHAR(100),
    ultimo_acceso TIMESTAMP,
    activo BOOLEAN
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    precio DECIMAL(10, 2),
    descripcion TEXT,
    disponible BOOLEAN,
    categoria VARCHAR(100)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    numero_pedido INT,
    fecha_hora TIMESTAMP,
    estado VARCHAR(100),
    para_llevar BOOLEAN,
    total DECIMAL(10, 2),
    mesa_numero INT,
    usuario_id INT REFERENCES USUARIOS(id)
);

CREATE TABLE detalle_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES PEDIDOS(id),
    producto_id INT REFERENCES PRODUCTOS(id),
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    comentarios VARCHAR(255)
);

CREATE TABLE facturas (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES PEDIDOS(id),
    numero_factura INT,
    fecha_emision TIMESTAMP,
    subtotal DECIMAL(10, 2),
    impuestos DECIMAL(10, 2),
    total DECIMAL(10, 2),
    metodo_pago VARCHAR(100),
    estado_pago VARCHAR(100)
);

CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(100),
    mensaje VARCHAR(255),
    fecha_hora TIMESTAMP,
    leida BOOLEAN,
    destinatario_id INT REFERENCES USUARIOS(id),
    pedido_id INT REFERENCES PEDIDOS(id)
);

-- USUARIOS
INSERT INTO USUARIOS (username, password_hash, nombre, rol, ultimo_acceso, activo) VALUES
('mesero1', 'hash123', 'Juan Pérez', 'mesero', '2025-03-21 10:15:00', true),
('mesero2', 'hash456', 'Laura Gómez', 'mesero', '2025-03-21 09:45:00', true),
('admin', 'admin', 'Carlos Ruiz', 'admin', '2025-03-20 18:30:00', true),
('mesero3', 'hash789', 'Pedro Torres', 'mesero', '2025-03-21 11:00:00', true);

-- PRODUCTOS
INSERT INTO PRODUCTOS (nombre, precio, descripcion, disponible, categoria) VALUES
('Hamburguesa Clásica', 25.50, 'Carne, lechuga, tomate, pan artesanal', true, 'Comida'),
('Papas Fritas', 10.00, 'Porción mediana de papas fritas crujientes', true, 'Acompañamiento'),
('Gaseosa 500ml', 8.00, 'Bebida con gas', true, 'Bebidas'),
('Pizza Personal', 30.00, 'Pizza de queso mozzarella y salsa de tomate', true, 'Comida');

-- PEDIDOS
INSERT INTO PEDIDOS (numero_pedido, fecha_hora, estado, para_llevar, total, mesa_numero, usuario_id) VALUES
(1001, '2025-03-21 12:10:00', 'entregado', false, 43.50, 5, 1),
(1002, '2025-03-21 12:30:00', 'preparando', false, 40.00, 3, 2),
(1003, '2025-03-21 13:00:00', 'pendiente', true, 33.50, null, 1),
(1004, '2025-03-21 13:15:00', 'entregado', false, 38.00, 2, 4);

-- DETALLE_PEDIDO
INSERT INTO DETALLE_PEDIDO (pedido_id, producto_id, cantidad, precio_unitario, subtotal, comentarios) VALUES
(1, 1, 1, 25.50, 25.50, 'Sin cebolla'),
(1, 2, 1, 10.00, 10.00, ''),
(1, 3, 1, 8.00, 8.00, 'Con hielo'),
(2, 4, 1, 30.00, 30.00, ''),
(2, 3, 1, 8.00, 8.00, ''),
(3, 1, 1, 25.50, 25.50, 'Extra tomate'),
(3, 3, 1, 8.00, 8.00, ''),
(4, 4, 1, 30.00, 30.00, ''),
(4, 2, 1, 8.00, 8.00, '');

-- FACTURAS
INSERT INTO FACTURAS (pedido_id, numero_factura, fecha_emision, subtotal, impuestos, total, metodo_pago, estado_pago) VALUES
(1, 5001, '2025-03-21 12:15:00', 43.50, 5.22, 48.72, 'Efectivo', 'Pagado'),
(2, 5002, '2025-03-21 12:40:00', 38.00, 4.56, 42.56, 'Tarjeta', 'Pagado'),
(3, 5003, '2025-03-21 13:05:00', 33.50, 4.02, 37.52, 'QR', 'Pendiente'),
(4, 5004, '2025-03-21 13:20:00', 38.00, 4.56, 42.56, 'Efectivo', 'Pagado');

-- NOTIFICACIONES
INSERT INTO NOTIFICACIONES (tipo, mensaje, fecha_hora, leida, destinatario_id, pedido_id) VALUES
('nuevo_pedido', 'Nuevo pedido en mesa 5', '2025-03-21 12:11:00', false, 1, 1),
('actualizacion', 'Pedido 1002 está en preparación', '2025-03-21 12:35:00', false, 2, 2),
('entregado', 'Pedido 1001 fue entregado', '2025-03-21 12:20:00', true, 1, 1),
('nuevo_pedido', 'Pedido para llevar registrado', '2025-03-21 13:01:00', false, 1, 3);
