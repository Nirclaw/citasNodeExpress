import { Expose, Transform } from "class-transformer";

export class getcitasMedicosFecha {

    @Expose({ name: "matricula" })
    @Transform(({ value }) => {
        console.log(value);

        if (Math.floor(value) && typeof (value) != "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    cit_medico: number;


    @Expose({ name: "fecha" })
    @Transform(({ value }) => {

        if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
            return value;
        else throw { status: 400, message: "Error en los parametros" };
    }, { toClassOnly: true })
    cit_fecha: string
    constructor(id: number, fecha: string) {
        this.cit_medico = id;
        this.cit_fecha = fecha
    }


}