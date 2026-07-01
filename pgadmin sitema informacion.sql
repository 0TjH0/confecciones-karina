-- 1. Tabla de Usuarios (Reemplaza a Supabase Auth)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    rut VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Aquí guardaremos la contraseña encriptada
    rol VARCHAR(50) DEFAULT 'cliente'
);

-- 2. Tabla de Servicios (Catálogo)
CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    precio NUMERIC NOT NULL,
    descripcion TEXT
);

-- 3. Tabla de Pedidos
CREATE TABLE pedidos (
    id VARCHAR(50) PRIMARY KEY,
    cliente_nombre VARCHAR(255) NOT NULL,
    rut_cliente VARCHAR(20) NOT NULL,
    servicio VARCHAR(255) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Esperando Pago',
    total NUMERIC NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insertar servicios base automáticamente
INSERT INTO servicios (nombre, categoria, precio, descripcion) VALUES 
('Confección de Uniformes', 'Confección', 15000, 'Uniformes a medida'),
('Estampado Institucional', 'Estampado', 4500, 'Logos y diseños corporativos'),
('Ajuste de Basta', 'Reparación', 2500, 'Ajuste rápido de pantalones');