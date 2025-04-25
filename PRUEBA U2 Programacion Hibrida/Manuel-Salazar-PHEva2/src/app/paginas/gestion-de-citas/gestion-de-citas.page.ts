import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { CitasFormComponent } from 'src/app/componentes/citas-form/citas-form.component';
import { CitasListComponent } from 'src/app/componentes/citas-list/citas-list.component';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Cita } from 'src/app/modelo/cita';

@Component({
  selector: 'app-gestion-de-citas',
  templateUrl: './gestion-de-citas.page.html',
  styleUrls: ['./gestion-de-citas.page.scss'],
  standalone: true,
  imports: [CitasFormComponent, CitasListComponent, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GestionDeCitasPage implements OnInit {

  citasGdc: Cita[] = []

  constructor(private administracionService: AdministracionService) { }

  async ngOnInit() {
    await this.administracionService.iniciarPlugin()
    await this._refreshCitas()
  }

  private async _refreshCitas() {
    this.citasGdc = await this.administracionService.getCitas()
  }

  async onCreateCita(event: { texto: string; autor: string }) {
    const p: Cita = { texto: event.texto, autor: event.autor }
    await this.administracionService.addCita(p)
    await this._refreshCitas()
  }

  async onDeleteCita(id: number) {
    await this.administracionService.deleteCita(id)
    await this._refreshCitas()
  }

}
