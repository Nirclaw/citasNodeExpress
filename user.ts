import { Expose, Transform } from "class-transformer";

export class user {
    @Expose({ name: "cedula" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) == "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    usu_id: number;

    @Expose({ name: "nombre" })
    @Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value)) return value; else throw { status: 400, message: "Error en los parametros" }; }, { toClassOnly: true })
    usu_nombre: String;


    @Expose({ name: "segundo_nombre" })
    @Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value)) return value; else throw { status: 400, message: "Error en los parametros" }; }, { toClassOnly: true })
    usu_segdo_nombre: String;

    @Expose({ name: "primer_apellido" })
    @Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value)) return value; else throw { status: 400, message: "Error en los parametros" }; }, { toClassOnly: true })
    usu_primer_apellido_usuar: String;

    @Expose({ name: "segundo_apellido" })
    @Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value)) return value; else throw { status: 400, message: "Error en los parametros" }; }, { toClassOnly: true })
    usu_segdo_apellido_usuar: String;
    @Expose({ name: "edad" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) == "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    usu_edad: number;
    @Expose({ name: "numero" })
    @Transform(({ value }) => { if (/^[0-9\s\W]+$/.test(value)) return value; else throw { status: 400, message: "Error en los parametros" }; }, { toClassOnly: true })
    usu_telefono: String;

    @Expose({ name: "direccion" })
    @Transform(({ value }) => { if (/^[a-zA-Z0-9\s\W]+$/.test(value)) return value; else throw { status: 400, message: "Error en los parametros" }; }, { toClassOnly: true })
    usu_direccion: String;

    @Expose({ name: "email" })
    @Transform(({ value }) => { if (/\S+@\S+.\S+/.test(value)) return value; else throw { status: 400, message: "Los datos no cumplen con los parametros de entrada" } }, { toClassOnly: true })
    usu_email: String;

    @Expose({ name: "tipo_documento" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) == "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    usu_tipodoc: number;

    @Expose({ name: "tipo_genero" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) == "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })

    usu_genero: number;
    @Expose({ name: "acudiente" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) == "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    usu_acudiente: number;

    constructor(usu_id: number,
        uso_nombre: string,
        uso_segundo_nombre: string,
        uso_primer_apellido: string,
        usu_segdo_apellido_usuar: string,
        usu_edad: number,
        usu_telefono: string,
        usu_direccion: string,
        usu_email: string,
        usu_tipodoc: number,
        usu_genero: number,
        usu_acudiente: number) {
        this.usu_id = usu_id
        this.usu_nombre = uso_nombre
        this.usu_segdo_nombre = uso_segundo_nombre
        this.usu_primer_apellido_usuar = uso_primer_apellido
        this.usu_segdo_apellido_usuar = usu_segdo_apellido_usuar
        this.usu_edad = usu_edad
        this.usu_telefono = usu_telefono
        this.usu_direccion = usu_direccion
        this.usu_email = usu_email
        this.usu_tipodoc = usu_tipodoc
        this.usu_genero = usu_genero
        this.usu_acudiente = usu_acudiente
    }

}