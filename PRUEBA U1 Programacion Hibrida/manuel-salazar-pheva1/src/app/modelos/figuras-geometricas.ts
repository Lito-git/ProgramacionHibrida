export abstract class FiguraGeometrica {
    
    constructor(private nombre: string) {}
    
    abstract calcularPerimetro(): number
}


export class Circulo extends FiguraGeometrica{

    constructor(private radio: number){
        super("Circulo");

    }

    override calcularPerimetro(): number {
        return 2 * Math.PI * this.radio

    }
}


export class TrianguloEscaleno extends FiguraGeometrica{

    constructor(private ladoA: number, private ladoB: number, private ladoC: number){
        super("Triangulo Escaleno")

    }

    override calcularPerimetro(): number {
        return this.ladoA + this.ladoB + this.ladoC
        
    }
}

export class TrianguloEquilatero extends FiguraGeometrica{
    constructor(private ladoA: number){
        super("Triangulo Equilatero")

    }

    override calcularPerimetro(): number {
        return this.ladoA * 3
        
    }
}

