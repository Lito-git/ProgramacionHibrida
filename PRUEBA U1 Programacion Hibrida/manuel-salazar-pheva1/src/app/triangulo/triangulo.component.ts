import { Component, OnInit } from '@angular/core';
import { IonButton, IonInput, IonItem, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonList, IonText } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { TrianguloEscaleno } from '../modelos/figuras-geometricas';

@Component({
  selector: 'app-triangulo',
  templateUrl: './triangulo.component.html',
  styleUrls: ['./triangulo.component.scss'],
  standalone: true,
  imports: [IonText, IonList, IonImg, IonCol, IonRow, IonGrid, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, FormsModule, IonButton, IonInput, IonItem]
})
export class TrianguloComponent implements OnInit {

  // Variables para guardar los valores ingresados por el usuario
  ladoAStr: string = ""
  ladoBStr: string = ""
  ladoCStr: string = ""
  resultado: string = ""

  constructor() { }

  ngOnInit() { }

  // Método que convierte los valores ingresados a números, calcula el perímetro del triangulo
  calcularPerimetro() {
    // Se convierten los lados A, B y C a número entero
    const ladoA = parseFloat(this.ladoAStr)
    const ladoB = parseFloat(this.ladoBStr)
    const ladoC = parseFloat(this.ladoCStr)

    // Crea una instancia del triángulo escaleno con los valores ya transformados
    const triangulo = new TrianguloEscaleno(ladoA, ladoB, ladoC)

    // Llama al método para calcular el perímetro
    const perimetro = triangulo.calcularPerimetro()

    // Muestra el resultado en pantalla
    this.resultado = `El perímetro del triángulo es: ${perimetro} cm`
  }

}
