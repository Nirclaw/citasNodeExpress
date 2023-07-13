import { Expose, Transform } from "class-transformer";

export class getCantCitasRechaFecha {

    @Expose({ name: "fecha" })
    @Transform(({ value }) => {

        if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
            return value;
        else throw { status: 400, message: "Error en los parametros" };
    }, { toClassOnly: true })
    cit_fecha: string
    constructor(id: string) {
        this.cit_fecha = id;
    }

}




