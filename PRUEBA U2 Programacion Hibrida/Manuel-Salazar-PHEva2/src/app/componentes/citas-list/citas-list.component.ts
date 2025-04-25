import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cita } from 'src/app/modelo/cita';
import { IonCard, IonText, IonCardContent, IonGrid, IonRow, IonCol, IonButtons, IonIcon, IonButton } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonButtons, IonCol, IonRow, IonGrid, CommonModule, IonCardContent, IonText, IonCard]
})
export class CitasListComponent implements OnInit {

  @Input() citasL: Cita[] = []

  @Output() citaDelete = new EventEmitter<{ id: number }>()

  enabledDelete: boolean = false

  constructor(private configuracionService: ConfiguracionService) {
    addIcons({ trashOutline });
  }
 
  ngOnInit() {
    this.configuracionService.enabledDelete$.subscribe(value => {
      this.enabledDelete = value
    })
  }

  onClickEliminar(id: number) {
    if (this.enabledDelete) {
      this.citaDelete.emit({ id })
    }
  }
}
