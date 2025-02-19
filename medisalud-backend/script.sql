CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    identity_number VARCHAR(50) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    base_cost DECIMAL(10,2) NOT NULL,
    dependent_cost DECIMAL(10,2) NOT NULL,
    max_dependents INTEGER NOT NULL
);

CREATE TABLE insureds (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    plan_id INTEGER NOT NULL REFERENCES plans(id) ON DELETE SET NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE
);

CREATE TABLE dependents (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    insured_id INTEGER NOT NULL REFERENCES insureds(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE
);

CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE provider_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE provider_type_details (
    provider_id INTEGER NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    type_id INTEGER NOT NULL REFERENCES provider_types(id) ON DELETE CASCADE,
    PRIMARY KEY (provider_id, type_id)
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE service_attentions (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    insured_id INTEGER NOT NULL REFERENCES insureds(id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    attention_date DATE NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    insured_id INTEGER NOT NULL REFERENCES insureds(id) ON DELETE CASCADE,
    payment_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE payment_details (
    id SERIAL PRIMARY KEY,
    payment_id INTEGER NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    payment_method_id INTEGER NOT NULL REFERENCES payment_methods(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    reference VARCHAR(100)
);

-- Insertando datos falsos en las tablas

INSERT INTO persons (identity_number, first_name, last_name, birth_date, phone, address) VALUES
('12345678', 'Juan', 'Pérez', '1985-06-15', '777123456', 'Calle Falsa 123, La Paz'),
('87654321', 'María', 'Gómez', '1990-08-21', '777654321', 'Av. Central 456, Cochabamba'),
('11223344', 'Carlos', 'Ramírez', '1982-11-05', '777987654', 'Calle Secundaria 789, Santa Cruz'),
('44332211', 'Ana', 'Fernández', '1995-02-12', '777567890', 'Pasaje Los Olivos 321, Sucre'),
('99887766', 'Pedro', 'Lopez', '1978-09-30', '777678901', 'Zona Sur 852, Oruro');

INSERT INTO plans (code, name, base_cost, dependent_cost, max_dependents) VALUES
('P001', 'Básico', 100.00, 50.00, 2),
('P002', 'Medio', 200.00, 100.00, 3),
('P003', 'Superior', 500.00, 200.00, 3);

INSERT INTO insureds (person_id, plan_id, email, status, start_date, end_date) VALUES
(1, 1, 'juan.perez@email.com', 'Activo', '2023-01-01', NULL),
(2, 2, 'maria.gomez@email.com', 'Activo', '2023-02-15', NULL),
(3, 3, 'carlos.ramirez@email.com', 'Inactivo', '2022-10-10', '2023-10-10');

INSERT INTO services (code, name, description) VALUES
('S001', 'Consulta General', 'Consulta médica básica'),
('S002', 'Radiografía', 'Examen de rayos X'),
('S003', 'Análisis de Sangre', 'Pruebas de laboratorio estándar');

INSERT INTO payments (invoice_number, insured_id, payment_date, amount, status) VALUES
('F123', 1, '2024-01-10', 100.00, 'Pagado'),
('F124', 2, '2024-01-15', 200.00, 'Pendiente'),
('F125', 3, '2024-01-20', 500.00, 'Pagado');


-- Creación de tabla de auditoría
CREATE TABLE plans_audit (
    id SERIAL PRIMARY KEY,
    plan_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_name TEXT
);

-- Creación del trigger para auditoría
CREATE OR REPLACE FUNCTION audit_plans() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO plans_audit (plan_id, action, changed_at, user_name)
    VALUES (NEW.id, TG_OP, NOW(), current_user);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_audit_plans
AFTER INSERT OR UPDATE OR DELETE
ON plans
FOR EACH ROW
EXECUTE FUNCTION audit_plans();