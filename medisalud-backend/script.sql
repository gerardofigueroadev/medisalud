CREATE TABLE idiomas (
    id_idioma SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN
);

CREATE TABLE niveles (
    id_nivel SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN
);

CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    id_idioma INT NOT NULL REFERENCES idiomas(id_idioma),
    id_nivel INT NOT NULL REFERENCES niveles(id_nivel),
    codigo VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    capacidad_minima INT,
    activo BOOLEAN
);

CREATE TABLE periodos (
    id_periodo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20)
);

CREATE TABLE personas (
    id_persona SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    tipo_documento VARCHAR(20),
    nro_documento VARCHAR(30) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    fecha_registro TIMESTAMP,
    activo BOOLEAN,
    UNIQUE (tipo_documento, nro_documento)
);

CREATE TABLE alumnos (
    id_alumno SERIAL PRIMARY KEY,
    id_persona INT NOT NULL REFERENCES personas(id_persona),
    codigo_alumno VARCHAR(20) NOT NULL UNIQUE,
    observaciones TEXT
);

CREATE TABLE profesores (
    id_profesor SERIAL PRIMARY KEY,
    id_persona INT NOT NULL REFERENCES personas(id_persona),
    especialidad VARCHAR(100),
    fecha_contratacion DATE
);

CREATE TABLE aulas (
    id_aula SERIAL PRIMARY KEY,
    numero VARCHAR(10) NOT NULL UNIQUE,
    capacidad INT,
    disponible BOOLEAN
);

CREATE TABLE horarios (
    id_horario SERIAL PRIMARY KEY,
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

CREATE TABLE modulos (
    id_modulo SERIAL PRIMARY KEY,
    id_curso INT NOT NULL REFERENCES cursos(id_curso),
    id_periodo INT NOT NULL REFERENCES periodos(id_periodo),
    id_profesor INT NOT NULL REFERENCES profesores(id_profesor),
    id_aula INT REFERENCES aulas(id_aula),
    codigo_modulo VARCHAR(20) NOT NULL UNIQUE,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    capacidad_maxima INT,
    estado VARCHAR(20)
);

CREATE TABLE modulo_horario (
    id_modulo_horario SERIAL PRIMARY KEY,
    id_modulo INT NOT NULL REFERENCES modulos(id_modulo),
    id_horario INT NOT NULL REFERENCES horarios(id_horario),
    UNIQUE (id_modulo, id_horario)
);

CREATE TABLE inscripciones (
    id_inscripcion SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL REFERENCES alumnos(id_alumno),
    id_modulo INT NOT NULL REFERENCES modulos(id_modulo),
    fecha_inscripcion TIMESTAMP,
    estado VARCHAR(20),
    observaciones TEXT,
    UNIQUE (id_alumno, id_modulo)
);

CREATE TABLE notas (
    id_nota SERIAL PRIMARY KEY,
    id_inscripcion INT NOT NULL REFERENCES inscripciones(id_inscripcion),
    id_profesor INT NOT NULL REFERENCES profesores(id_profesor),
    valor DECIMAL(5,2) NOT NULL,
    observacion TEXT,
    fecha_registro TIMESTAMP
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    id_persona INT NOT NULL REFERENCES personas(id_persona),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    ultimo_acceso TIMESTAMP,
    activo BOOLEAN
);

-- Insertando datos de prueba

INSERT INTO idiomas (nombre, descripcion, activo) VALUES 
('Inglés', 'Idioma inglés', TRUE),
('Francés', 'Idioma francés', TRUE),
('Alemán', 'Idioma alemán', TRUE);

INSERT INTO niveles (nombre, descripcion, activo) VALUES 
('Básico', 'Nivel básico', TRUE),
('Medio', 'Nivel medio', TRUE),
('Avanzado', 'Nivel avanzado', TRUE);

INSERT INTO cursos (id_idioma, id_nivel, codigo, nombre, capacidad_minima, activo) VALUES 
(1, 1, 'ENG101', 'Inglés Básico', 10, TRUE),
(2, 2, 'FRN201', 'Francés Intermedio', 8, TRUE);

INSERT INTO periodos (nombre, fecha_inicio, fecha_fin, estado) VALUES 
('Periodo 2025-01', '2025-01-01', '2025-06-30', 'Activo');

INSERT INTO personas (nombre, apellido, tipo_documento, nro_documento, telefono, email, direccion, fecha_registro, activo) VALUES 
('Juan', 'Pérez', 'DNI', '12345678', '555-1234', 'juan.perez@example.com', 'Calle 123', NOW(), TRUE),
('Ana', 'López', 'DNI', '87654321', '555-5678', 'ana.lopez@example.com', 'Avenida 456', NOW(), TRUE);

INSERT INTO alumnos (id_persona, codigo_alumno, observaciones) VALUES 
(1, 'A12345', 'Estudiante destacado');

INSERT INTO profesores (id_persona, especialidad, fecha_contratacion) VALUES 
(2, 'Idiomas', '2024-12-01');

INSERT INTO aulas (numero, capacidad, disponible) VALUES 
('101', 20, TRUE);

INSERT INTO horarios (dia_semana, hora_inicio, hora_fin) VALUES 
('Lunes', '08:00', '10:00');

INSERT INTO modulos (id_curso, id_periodo, id_profesor, id_aula, codigo_modulo, fecha_inicio, fecha_fin, capacidad_maxima, estado) VALUES 
(1, 1, 1, 1, 'MOD001', '2025-01-10', '2025-06-20', 15, 'Abierto');

INSERT INTO modulo_horario (id_modulo, id_horario) VALUES 
(1, 1);

INSERT INTO inscripciones (id_alumno, id_modulo, fecha_inscripcion, estado, observaciones) VALUES 
(1, 1, NOW(), 'Inscrito', 'Pagado');

INSERT INTO notas (id_inscripcion, id_profesor, valor, observacion, fecha_registro) VALUES 
(1, 1, 85.50, 'Buen desempeño', NOW());

INSERT INTO usuarios (id_persona, username, password, rol, ultimo_acceso, activo) VALUES 
(1, 'jperez', 'hashedpassword', 'Estudiante', NOW(), TRUE);
