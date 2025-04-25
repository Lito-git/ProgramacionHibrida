import { Component} from '@angular/core';
import { IonContent, IonSelect, IonSelectOption, SelectChangeEventDetail, IonCard, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { TrianguloComponent } from "../triangulo/triangulo.component";
import { CirculoComponent } from "../circulo/circulo.component";
import { IonSelectCustomEvent } from '@ionic/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonCard, CommonModule, IonContent, CirculoComponent, TrianguloComponent, IonSelect, IonSelectOption],
})
export class HomePage {

  // Variable para almacenar el tipo de figura seleccionada por el usuario
  tipoFiguraGeometrica: string = ""

  constructor() {}

  // Método que verifica y devuelve true si la figura seleccionada es un círculo
  esCirculo() { 
    return this.tipoFiguraGeometrica == "circulo"

  }
  // Método que verifica y devuelve true si la figura seleccionada es un triangulo
  esTriangulo() { 
    return this.tipoFiguraGeometrica == "triangulo"

  }

  // Método que se ejecuta cuando el usuario elige una figura en el selector
  elegirFiguraGeometrica($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    this.tipoFiguraGeometrica = $event.detail.value

    }
    
}

