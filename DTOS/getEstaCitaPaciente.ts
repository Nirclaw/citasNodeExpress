import { Expose, Transform } from "class-transformer";

export class getEstaCitaPaciente {

    @Expose({ name: "cedula" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) != "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    id_uso: number;
    constructor(id: number) {
        this.id_uso = id;
    }

}