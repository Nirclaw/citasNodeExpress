import { Expose, Transform } from "class-transformer";

export class getCantEspecialidades {

    @Expose({ name: "codigo" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof (value) != "number")
            return Math.floor(value);
        else throw { status: 400, message: "Error en los parametros" }
    }, { toClassOnly: true })
    med_especialidad: number;
    constructor(id: number) {
        this.med_especialidad = id;
    }

}