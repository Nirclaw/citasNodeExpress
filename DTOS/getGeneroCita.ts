import { Transform, Expose } from "class-transformer";

export class getGeneroyEstadoCita {
    @Expose({ name: "estado" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) != "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    cit_estadoCita: number;

    @Expose({ name: "genero" })
     @Transform(({ value }) => {        

        if (Math.floor(value) && typeof (value) != "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    usu_genero: number;


    constructor(estado: number, genero: number) {
        this.cit_estadoCita = estado
        this.usu_genero = genero
    }
}