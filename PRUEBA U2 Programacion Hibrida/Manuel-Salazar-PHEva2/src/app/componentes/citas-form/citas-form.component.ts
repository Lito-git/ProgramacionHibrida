import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonInput, IonCol, IonRow, IonGrid } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, FormsModule, IonInput, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonText, IonButton, ]
})
export class CitasFormComponent  implements OnInit {

  textoStr: string = ''
  autorStr: string = ''

  @Output() citaCreate = new EventEmitter<{ texto: string, autor: string }>()

  constructor() { }

  ngOnInit() {}

  onClickAgregar(){
    this.citaCreate.emit({ texto: this.textoStr, autor: this.autorStr })
  }

}
