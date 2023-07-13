
CREATE DATABASE gestion_citas;
USE gestion_citas;
SELECT * FROM cita WHERE cit_medico = 123456;
CREATE TABLE usuario(
    usu_id INT NOT NULL PRIMARY KEY,
    usu_nombre VARCHAR(50) NOT NULL,
    usu_segdo_nombre VARCHAR(45) NOT NULL,
    usu_primer_apellido_usuar VARCHAR(50) NOT NULL,
    usu_segdo_apellido_usuar VARCHAR(50),
    usu_edad INT NOT NULL,
    usu_telefono VARCHAR(50) NOT NULL,
    usu_direccion VARCHAR(100) NOT NULL,
    usu_email VARCHAR(100) NOT NULL,
    usu_tipodoc INT NOT NULL,
    usu_genero INT NOT NULL,
    usu_acudiente INT
);

CREATE TABLE tipo_documento(
    tipdoc_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipdoc_nombre VARCHAR(20) NOT NULL,
    tipdoc_abreviatura VARCHAR (20) NOT NULL
);

CREATE TABLE genero(
    gen_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    gen_nombre VARCHAR(20) NOT NULL,
    gen_abreviatura VARCHAR(20) NOT NULL
);

CREATE TABLE acudiente(
    acu_codigo INT NOT NULL PRIMARY KEY,
    acu_nombreCompleto VARCHAR(100) NOT NULL,
    acu_telefono VARCHAR(100) NOT NULL,
    acu_direccion VARCHAR(200) NOT NULL
);

CREATE TABLE cita(
    cit_codigo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cit_fecha DATE NOT NULL,
    cit_estadoCita INT NOT NULL,
    cit_medico INT NOT NULL,
    cit_datosUsuario INT NOT NULL
);

CREATE TABLE estado_cita(
    estcita_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estcita_nombre VARCHAR(20) NOT NULL
);

CREATE TABLE medico(
    med_nroMatriculaProsional INT NOT NULL PRIMARY KEY,
    med_nombreCompleto VARCHAR(120) NOT NULL,
    med_consultorio INT NOT NULL,
    med_especialidad INT NOT NULL
);

CREATE TABLE especialidad(
    esp_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    esp_nombre VARCHAR(20) NOT NULL
);

CREATE TABLE consultorio(
    cons_codigo INT NOT NULL PRIMARY KEY,
    cons_nombre VARCHAR(50) NOT NULL
);
ALTER TABLE usuario ADD CONSTRAINT fk_usu_tipoDoc FOREIGN KEY(usu_tipodoc) REFERENCES tipo_documento(tipdoc_id);
ALTER TABLE usuario ADD CONSTRAINT fk_usu_genero FOREIGN KEY(usu_genero) REFERENCES genero(gen_id);
ALTER TABLE usuario ADD CONSTRAINT fk_usu_acudiente FOREIGN KEY(usu_acudiente) REFERENCES acudiente(acu_codigo);
ALTER TABLE cita ADD CONSTRAINT fk_cita_usuario FOREIGN KEY(cit_datosUsuario) REFERENCES usuario(usu_id);
ALTER TABLE cita ADD CONSTRAINT fk_cita_estadoCit FOREIGN KEY(cit_estadoCita) REFERENCES estado_cita(estcita_id);
ALTER TABLE cita ADD CONSTRAINT fk_cita_medico FOREIGN KEY(cit_medico) REFERENCES medico(med_nroMatriculaProsional);
ALTER TABLE medico ADD CONSTRAINT fk_medico_especialidad FOREIGN KEY(med_especialidad) REFERENCES especialidad(esp_id);
ALTER TABLE medico ADD CONSTRAINT fk_medico_consultorio FOREIGN KEY(med_consultorio) REFERENCES consultorio(cons_codigo);



-- Inserts para la tabla tipo_documento
INSERT INTO tipo_documento (tipdoc_nombre, tipdoc_abreviatura) VALUES
    ('Cédula de Ciudadanía', 'CC'),
    ('Tarjeta de Identidad', 'TI'),
    ('Cédula de Extranjería', 'CE'),
    ('Pasaporte', 'PAS');

-- Inserts para la tabla genero
INSERT INTO genero (gen_nombre, gen_abreviatura) VALUES
    ('Masculino', 'M'),
    ('Femenino', 'F'),
    ('No binario', 'NB');

-- Inserts para la tabla acudiente
INSERT INTO acudiente (acu_codigo, acu_nombreCompleto, acu_telefono, acu_direccion) VALUES
    (1, 'Juan Pérez', '1234567890', 'Calle 123, Ciudad'),
    (2, 'María López', '0987654321', 'Avenida 456, Ciudad');

-- Inserts para la tabla usuario
INSERT INTO usuario (usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_edad, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) VALUES
    (1, 'Juan', 'Carlos', 'Gómez', NULL, 30, '1234567890', 'Calle 789, Ciudad', 'juan@gmail.com', 1, 1, NULL),
    (2, 'María', 'Fernanda', 'Hernández', 'López', 25, '0987654321', 'Avenida 123, Ciudad', 'maria@gmail.com', 2, 2, 1);

-- Inserts para la tabla estado_cita
INSERT INTO estado_cita (estcita_nombre) VALUES
    ('Programada'),
    ('Cancelada'),
    ('Realizada');

-- Inserts para la tabla especialidad
INSERT INTO especialidad (esp_nombre) VALUES
    ('Pediatría'),
    ('Cardiología'),
    ('Dermatología');

-- Inserts para la tabla consultorio
INSERT INTO consultorio (cons_codigo, cons_nombre) VALUES
    (1, 'Consultorio 101'),
    (2, 'Consultorio 202');

-- Inserts para la tabla medico
INSERT INTO medico (med_nroMatriculaProsional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES
    (123456, 'Dr. Roberto Martínez', 1, 1),
    (789012, 'Dra. Ana Ramírez', 2, 2);

-- Inserts para la tabla cita
INSERT INTO cita (cit_codigo, cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) VALUES
    (1, '2023-07-15', 1, 123456, 1),
    (2, '2023-07-20', 1, 789012, 2);



SELECT usu_id,usu_nombre,med_nombreCompleto,cit_fecha,cons_nombre FROM usuario INNER JOIN cita ON usuario.usu_id=cita.cit_datosUsuario INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProsional INNER JOIN consultorio ON medico.med_consultorio=consultorio.cons_codigo WHERE cit_datosUsuario = 1102391340 ;

SELECT med_nombreCompleto,cons_nombre FROM medico INNER JOIN consultorio ON  medico.med_consultorio= consultorio.cons_codigo;


SELECT * FROM cita WHERE cit_medico = 981231 AND  cit_fecha = "2023-07-25";

SELECT * FROM cita INNER JOIN medico ON cita.cit_estadoCita = medico.med_consultorio INNER JOIN consultorio ON medico.med_consultorio=consultorio.cons_codigo WHERE cit_estadoCita = 1 ;

SELECT usu_id,usu_nombre,cit_estadoCita,cons_codigo,cons_nombre,estcita_nombre FROM usuario INNER JOIN cita ON usuario.usu_id = cita.cit_datosUsuario JOIN medico ON cita.cit_estadoCita = medico.med_consultorio INNER JOIN consultorio ON medico.med_consultorio=consultorio.cons_codigo INNER JOIN estado_cita ON cita.cit_estadoCita=estado_cita.estcita_id WHERE usu_id = 1 ;



SELECT usu_nombre,cit_estadoCita,usu_genero FROM usuario INNER JOIN cita  ON usuario.usu_id=cita.cit_datosUsuario WHERE cit_estadoCita = 1 AND usu_genero = 1;

SELECT usu_nombre,med_nombreCompleto FROM usuario INNER JOIN cita ON usuario.usu_id=cita.cit_datosUsuario INNER JOIN medico ON cita.cit_medico=medico.med_nroMatriculaProsional WHERE cit_estadoCita = 3 AND cit_fecha = "2023-07-15";

SELECT * FROM usuario;