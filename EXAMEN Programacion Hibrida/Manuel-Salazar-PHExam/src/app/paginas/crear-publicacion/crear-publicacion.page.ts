import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminitracionService } from 'src/app/servicios/administracion.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CrearPublicacionPage implements OnInit {

  publicacionEjemplo: Publicacion[] = []

  titulo: string = ''
  descripcion: string = ''
  imagenBase64: string = ''

  showToast: boolean = false

  constructor(private administracionService: AdminitracionService, private router: Router) {
    addIcons({ cameraOutline })
  }


  async ngOnInit(){
    await this.administracionService.iniciarPlugin()
    await this._getPublicacionEjemplo()
  }

  
  private async _getPublicacionEjemplo(){
    this.publicacionEjemplo = await this.administracionService.getPublicacion()
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    })

    if (image.base64String != null || image.base64String != undefined) {
      this.imagenBase64 = image.base64String
    }
  }

  async onClickCreatePublicacion() {
    if (this.titulo && this.descripcion && this.imagenBase64) {
      const newPublicacion: Publicacion = {titulo: this.titulo, descripcion: this.descripcion, fecha: new Date(), imagen: this.imagenBase64}

      await this.administracionService.addPublicacion(newPublicacion)

      this.showToast = true

      setTimeout(async() => { this.showToast = false; await this.router.navigate(['/home'])}, 2000)
      
    }
  }
}
