import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { PublicacionesListComponent } from "../componentes/publicaciones-list/publicaciones-list.component";
import { AdminitracionService } from '../servicios/administracion.service';
import { Publicacion } from '../modelo/publicacion';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [PublicacionesListComponent, RouterModule, CommonModule, IonIcon, IonFabButton, IonFab, IonHeader,
    IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

  publicacionesHome: Publicacion[] = []


  constructor(private administracionService: AdminitracionService) {
    addIcons({ add });
  }


  async ngOnInit() {
    await this.administracionService.iniciarPlugin()
    await this._refreshPublicaciones()
  }

  async ionViewWillEnter(): Promise<void> {
    await this.administracionService.iniciarPlugin()
    await this._refreshPublicaciones()
  }


  private async _refreshPublicaciones(): Promise<void> {
    this.publicacionesHome = await this.administracionService.getPublicacion()
  }

  async onDeletePublicacion(id: number) {
    await this.administracionService.deletePublicacion(id)
    await this._refreshPublicaciones()
  }

  async onCreatedPublicacion(p: Publicacion) {
    this.publicacionesHome.push(p)
    await this._refreshPublicaciones()
  }

}
