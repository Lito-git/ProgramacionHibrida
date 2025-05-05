import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonCard, IonCardContent, IonButton, IonIcon, IonCardTitle, IonCardSubtitle, IonGrid, IonRow,
  IonCol, IonHeader, IonTitle, IonContent, IonText, IonToolbar, IonModal, IonToast
} from "@ionic/angular/standalone";
import { trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Publicacion } from 'src/app/modelo/publicacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publicaciones-list',
  templateUrl: './publicaciones-list.component.html',
  styleUrls: ['./publicaciones-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonToolbar, IonText, IonContent, IonTitle, IonHeader, IonCol, IonRow, IonGrid,
    IonCardSubtitle, IonCardTitle, IonIcon, IonButton, IonCard, IonCardContent, IonModal, IonToast]
})
export class PublicacionesListComponent implements OnInit {

  @Input() publicacionesL: Publicacion[] = []

  @Output() publicacionDelete = new EventEmitter<{ id: number }>()

  isModalDeleteOpen: boolean = false;
  showToast: boolean = false
  selectedPublicacion: Publicacion | null = null


  constructor() {
    addIcons({ trashOutline });
  }


  ngOnInit() { }


  setModalDeleteOpen(open: boolean) {
    this.isModalDeleteOpen = open
  }

  onClickDelete(p: Publicacion) {
    this.selectedPublicacion = p
    this.setModalDeleteOpen(true)
  }

  confirmDelete() {
    if (this.selectedPublicacion?.id != null) {
      this.publicacionDelete.emit({ id: this.selectedPublicacion.id })
      this.setModalDeleteOpen(false)

      this.showToast = true

      setTimeout(() => { this.showToast = false }, 2000)
    }
  }

}
