import { Expose, Transform } from "class-transformer";

export class getCantCitasUsuario {

    @Expose({ name: "cedula" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) != "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    cit_datosUsuario: number;
    constructor(id: number) {
        this.cit_datosUsuario = id;
    }

}