import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { AdministracionService } from '../servicios/administracion.service';
import { Cita } from '../modelo/cita';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, settingsOutline } from 'ionicons/icons';
import { ConfiguracionService } from '../servicios/configuracion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, IonFabButton, IonFab, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

  citaRandom: Cita | null = null;
  showRandomCita: boolean = false;
  private subscription: Subscription | null = null;

  constructor(private administracionService: AdministracionService, private configuracionService: ConfiguracionService) {
    addIcons({ add, settingsOutline });
  }


  async ngOnInit(): Promise<void> {
    await this.administracionService.iniciarPlugin()

    this.configuracionService._showRandomCita$.subscribe(value => {
      this.showRandomCita = value;
      this._loadRandomCita()

    });
  }

  async ionViewWillEnter(): Promise<void> {
    await this._loadRandomCita()
    await this.administracionService.iniciarPlugin()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private async _loadRandomCita(): Promise<void> {
    this.citaRandom = await this.administracionService.getRandomCita()
  }

}
