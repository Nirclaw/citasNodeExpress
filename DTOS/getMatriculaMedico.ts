import { Expose, Transform } from "class-transformer";

export class getMatriculaMedico {

    @Expose({ name: "matricula" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) != "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    cit_medico: number;
    constructor(id: number) {
        this.cit_medico = id;
    }

}