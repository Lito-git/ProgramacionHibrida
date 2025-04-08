import { Component, OnInit } from '@angular/core';
import { IonButton, IonItem, IonInput, IonImg, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonCardContent, IonList, IonCol, IonRow, IonGrid, IonText } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Circulo } from '../modelos/figuras-geometricas';

@Component({
  selector: 'app-circulo',
  templateUrl: './circulo.component.html',
  styleUrls: ['./circulo.component.scss'],
  standalone: true,
  imports: [IonText, IonGrid, IonRow, IonCol, IonList, IonCardContent, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, FormsModule, IonInput, IonButton, IonItem, IonImg]
})
export class CirculoComponent implements OnInit {

  //variable para el radio ingresado por el usuario
  radioStr: string = ""; 
  // variable para el resultado del calculo de perimetro
  resultado: string = ""; 

  constructor() { }

  ngOnInit() { }

  //definicion del metodo que calculo de perimetro al presionar el boton Calcular perimetro
  calcularPerimetro() { 
    //transforma el valor ingresado a numero decimal
    const radioIngresado = parseFloat(this.radioStr) 

    //crea una nueva instancia circulo con el valor del radio ya transformado a numero
    const circulo = new Circulo(radioIngresado) 

    //llama al metodo calcularPerimetro() de la clase Circulo
    const perimetro = circulo.calcularPerimetro() 
    
    //almacena el resultado que se mostrara en pantalla
    this.resultado = `El perímetro del círculo es ${perimetro.toFixed(2)} cm` 
  }

}
