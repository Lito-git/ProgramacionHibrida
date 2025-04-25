import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonToggle } from '@ionic/angular/standalone';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonItem, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, IonToggle, CommonModule, FormsModule]
})
export class ConfiguracionPage implements OnInit {

  enabledDelete: boolean = false
  showRandomCita: boolean = false

  constructor(private configuracionService: ConfiguracionService) { }

  ngOnInit() {
    this.configuracionService.enabledDelete$.subscribe(value => {
      this.enabledDelete = value
    })

    this.configuracionService._showRandomCita$.subscribe(value => {
      this.showRandomCita = value
    });
  } 

  onToggleDelete() {
    this.configuracionService.setSetEnabledDeletion(this.enabledDelete)
  }

  onToggleShowRandomCita() {
    this.configuracionService.setSetShowRandomCita(this.showRandomCita)
  }

}
