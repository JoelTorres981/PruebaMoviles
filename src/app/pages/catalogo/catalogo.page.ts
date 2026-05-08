import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonModal,
  IonButtons,
  IonButton,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonModal,
    IonButtons,
    IonButton,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule]
})
export class CatalogoPage implements OnInit {

  constructor(private librosService: LibrosService) { }

  libros: any[] = [];
  topLibros: any[] = [];
  textoBusqueda = '';
  busquedaHecha = false;
  selectedLibro: any = null;
  isModalOpen = false;

  ngOnInit() {
    this.librosService.getTopLibros().subscribe({
      next: (data) => {
        this.topLibros = data.docs;
        if (!this.busquedaHecha) {
          this.libros = this.topLibros;
        }
      },
      error: (error) => console.error(error)
    });
  }

  onSearch(event: any) {
    this.textoBusqueda = event.detail.value || '';
    if (this.textoBusqueda.length > 2) {
      this.librosService.getLibrosDetails(this.textoBusqueda).subscribe({
        next: (data) => {
          this.libros = data.docs;
          this.busquedaHecha = true;
          console.log(this.libros);
        },
        error: (error) => {
          console.error(error);
          this.busquedaHecha = true;
        }
      });
    } else {
      this.libros = this.topLibros;
      this.busquedaHecha = false;
    }
  }

  verDetalles(libro: any) {
    this.selectedLibro = libro;
    this.isModalOpen = true;

    if (libro.key) {
      this.librosService.getWorkDetails(libro.key).subscribe({
        next: (detalles) => {
          // Guardamos los detalles extra obtenidos de la Works API
          this.selectedLibro.detallesCompletos = detalles;
        },
        error: (err) => console.error(err)
      });
    }
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.selectedLibro = null;
  }

  getCoverUrl(coverId: number | string): string {
    return this.librosService.getCoverUrl(coverId);
  }

}
