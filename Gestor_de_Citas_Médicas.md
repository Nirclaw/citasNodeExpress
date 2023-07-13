

# Gestor de Citas Médicas

Este proyecto simula un sistema de gestión de citas médicas y utiliza una base de datos local de SQL. Asegúrate de tener instalados XAMPP, Node.js, NVM y Visual Studio Code, ya que se descargarán varias dependencias como devDependencies.

## Requisitos

Asegúrate de tener los siguientes requisitos instalados:

- XAMPP
- Node.js
- NVM
- Visual Studio Code u otro editor de texto

## Instalación

1. Clona el repositorio:

   ```
   shell
   ```

```
git clone https://github.com/tu_usuario/tu_repositorio.git

```

Instala las dependencias:

```
shell
npm install
```

uso

## Creación de la base de datos

1. Abre tu sistema de gestión de bases de datos (por ejemplo, MySQL Workbench).
2. Crea una nueva consulta o script SQL.
3. copia y pega el script y listo :)

```sql


CREATE DATABASE gestion_citas;
USE gestion_citas;

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
```

Para iniciar este proyecto, necesitarás las siguientes dependencias como devDependencies:

- class-transformer
- dotenv
- express
- mysql2
- nodemon
- reflect-metadata
- typescript

Asegúrate de tener Node.js instalado y ejecuta el siguiente comando en la consola de Visual Studio Code para inicializar el proyecto y generar el archivo package.json:

```
shell
```

```
npm init -y

```

A continuación, copia y pega el siguiente contenido en el archivo package.json:

```
json
```

```
{
  "name": "gestorcitas",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon --quiet app.js",
    "tsc": "tsc -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "class-transformer": "0.5.1",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "mysql2": "3.5.1",
    "nodemon": "3.0.1",
    "reflect-metadata": "0.1.13",
    "typescript": "5.1.6"
  }
}

```

Asegúrate de agregar la línea `"type": "module"` al archivo package.json.

Además, crea un archivo llamado tsconfig.json en la raíz del proyecto y pega el siguiente contenido:

```
json
```

```
{
  "compilerOptions": {
    "target": "es6",
    "module": "ES6",
    "moduleResolution": "node",
    "outDir": "./controller",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}

```

Ahora, te explicaré el funcionamiento de esta API de gestión de citas médicas:

1. Para conocer la cantidad de usuarios registrados, utiliza el siguiente endpoint: `http://127.10.10.10:5100/usuarios/cantidad`. Este endpoint devolverá la información de los usuarios existentes en la base de datos en orden alfabético ascendente.

   Ejemplo de datos que recibirás:

   ```
   json
   ```

```
{
  "usu_id": 123456789,
  "usu_nombre": "Jhon",
  "usu_segdo_nombre": "Eduar",
  "usu_primer_apellido_usuar": "Almeida",
  "usu_segdo_apellido_usuar": "Hernandez",
  "usu_edad": 23,
  "usu_telefono": "12031237",
  "usu_direccion": "Calle 789, Ciudad",
  "usu_email": "jhonsitocaliente@gmail.com",
  "usu_tipodoc": 1,
  "usu_genero": 3,
  "usu_acudiente": 1
}

```

Si deseas conocer las citas de un médico en específico, utiliza el siguiente endpoint: `http://127.10.10.10:5100/usuarios/cantidad/medico/981231`, donde "981231" es la tarjeta profesional del médico.

Ejemplo de cómo llegarán los datos:

```
json
```

```
[
  {
    "cit_codigo": 3,
    "cit_fecha": "2023-07-25T05:00:00.000Z",
    "cit_estadoCita": 1,
    "cit_medico": 981231,
    "cit_datosUsuario": 1102391340
  },
  {
    "cit_codigo": 5,
    "cit_fecha": "2023-07-13T05:00:00.000Z",
    "cit_estadoCita": 1,
    "cit_medico": 981231,
    "cit_datosUsuario": 1102391340
  }
]

```

Si deseas conocer las citas de un paciente en específico, utiliza el siguiente endpoint: `http://127.10.10.10:5100/usuarios/cantidad/consultoria/1102391340`, donde "1102391340" es la cédula del paciente.

Ejemplo de cómo llegarán los datos:

```
json
```

```
[
  {
    "usu_id": 1102391340,
    "usu_nombre": "Nicolas",
    "med_nombreCompleto": "Dr. Nicolas Rueda",
    "cit_fecha": "2023-07-25T05:00:00.000Z",
    "cons_nombre": "Consultorio 101"
  },
  {
    "usu_id": 1102391340,
    "usu_nombre": "Nicolas",
    "med_nombreCompleto": "Dr. Nicolas Rueda",
    "cit_fecha": "2023-07-13T05:00:00.000Z",
    "cons_nombre": "Consultorio 101"
  }
]

```

Si deseas conocer el estado de las citas programadas, el consultorio y el nombre del paciente, utiliza el siguiente endpoint: `http://127.10.10.10:5100/usuarios/cantidad/info/1102391340`, donde "1102391340" es la cédula del paciente.

Ejemplo de cómo llegarán los datos:

```
json
```

```
{
  "usu_id": 1102391340,
  "usu_nombre": "Nicolas",
  "cit_estadoCita": 1,
  "cons_codigo": 1,
  "cons_nombre": "Consultorio 101",
  "estcita_nombre": "Programada"
},
{
  "usu_id": 1102391340,
  "usu_nombre": "Nicolas",
  "cit_estadoCita": 1,
  "cons_codigo": 1,
  "cons_nombre": "Consultorio 101",
  "estcita_nombre": "Programada"
}

```

Si deseas conocer la cantidad de citas y el estado según el género y el estado de la cita, utiliza el siguiente endpoint: `http://127.10.10.10:5100/usuarios/cantidad/genero/1/1`, donde "1" corresponde al género (1 = Hombre, 2 = Mujer, 3 = No binario) y "1" corresponde al estado de la cita (1 = Programada, 2 = Cancelada, 3 = Realizada).

Ejemplo de cómo llegarán los datos:

```
json
```

```
[
  {
    "usu_nombre": "Juan",
    "cit_estadoCita": 1,
    "usu_genero": 1
  },
  {
    "usu_nombre": "Nicolas",
    "cit_estadoCita": 1,
    "usu_genero": 1
  },
  {
    "usu_nombre": "Nicolas",
    "cit_estadoCita": 1,
    "usu_genero": 1
  }
]

```

Para crear un usuario, utiliza el siguiente endpoint: `http://127.10.10.10:5100/usuarios/cantidad/create`. Debes enviar la información del usuario en el cuerpo de la solicitud de la siguiente manera:

```
json
```

```
{
  "cedula": 000001,
  "nombre": "Nicolas",
  "segundo_nombre": "Mauricio",
  "primer_apellido": "Caicedo",
  "segundo_apellido": "Rueda",
  "edad": 23,
  "numero": "320202022",
  "direccion": "Calle 789 Ciudad",
  "email": "locos@gmail.com",
  "tipo_documento": 1,
  "tipo_genero": 3,
  "acudiente": 1
}

```

Ten en cuenta que los tipos de documentos son: 1 = Cédula de Ciudadanía, 2 = Tarjeta de Identidad, 3 = Cédula de Extranjería, 4 = Pasaporte. Los tipos de género son: 1 = Hombre, 2 = Mujer, 3 = No binario. En el campo "acudiente", debes utilizar los valores existentes que son 1 o 2.

Si deseas conocer la cantidad de médicos registrados, utiliza el siguiente endpoint: `http://127.10.10.10:5100/medicos/cantidad/`.

Ejemplo de cómo llegarán los datos:

```
json
```

```
{
  "med_nroMatriculaProfesional": 123456,
  "med_nombreCompleto": "Dr. Roberto Martínez",
  "med_consultorio": 1,
  "med_especialidad": 1
}

```

Si deseas conocer la cantidad de médicos en una especialidad específica, utiliza el siguiente endpoint: `http://127.10.10.10:5100/medicos/cantidad/especialidad/1`, donde "1" corresponde al código de la especialidad.

Ejemplo de cómo llegarán los datos:

```
json
```

```
{
  "med_nroMatriculaProfesional": 123456,
  "med_nombreCompleto": "Dr. Roberto Martínez",
  "med_consultorio": 1,
  "med_especialidad": 1
}

```

Si deseas conocer los médicos y en qué consultorio se encuentran, utiliza el siguiente endpoint: `http://127.10.10.10:5100/medicos/cantidad/informacion`.

Ejemplo de cómo llegarán los datos:

```
json
```

```
{
  "med_nombreCompleto": "Dr. Roberto Martínez",
  "cons_nombre": "Consultorio 101"
},
{
  "med_nombreCompleto": "Dra. Ana Ramírez",
  "cons_nombre": "Consultorio 202"
}

```

Si deseas conocer la cantidad de citas registradas, utiliza el siguiente endpoint: `http://127.10.10.10:5100/citas/cantidad`.

Ejemplo de cómo llegarán los datos:

```
json
```

```
{
  "cit_codigo": 5,
  "cit_fecha": "2023-07-13T05:00:00.000Z",
  "cit_estadoCita": 1,
  "cit_medico": 981231,
  "cit_datosUsuario": 1102391340
}

```

Si deseas conocer las citas de un médico en una fecha específica, utiliza el siguiente endpoint: `http://127.10.10.10:5100/citas/cantidad/981231/2023-07-13`, donde "981231" es el número de matrícula profesional del médico y "2023-07-13" es la fecha.

Ejemplo de cómo llegarán los datos:

```
json
```

```
{
  "cit_codigo": 5,
  "cit_fecha": "2023-07-13T05:00:00.000Z",
  "cit_estadoCita": 1,
  "cit_medico": 981231,
  "cit_datosUsuario": 1102391340
}

```

Si deseas conocer las citas de un médico en específico, utiliza el siguiente endpoint: `http://127.10.10.10:5100/citas/cantidad/981231`, donde "981231" es el número de matrícula profesional del médico.

Ejemplo de cómo llegarán los datos:

```
json
```

1. ```
   [
     {
       "cit_codigo": 3,
       "cit_fecha": "2023-07-25T05:00:00.000Z",
       "cit_estadoCita": 1,
       "cit_medico": 981231,
       "cit_datosUsuario": 1102391340
     },
     {
       "cit_codigo": 5,
       "cit_fecha": "2023-07-13T05:00:00.000Z",
       "cit_estadoCita": 1,
       "cit_medico": 981231,
       "cit_datosUsuario": 1102391340
     }
   ]

   ```

2. Si deseas conocer las citas rechazadas en una fecha específica, utiliza el siguiente endpoint: `http://127.10.10.10:5100/citas/cantidad/rechazada/2023-07-15`, donde "2023-07-15" es la fecha.

Espero que esta información te sea útil para utilizar la API de gestión de citas médicas.