import { FormsModule } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSpinner,
  IonSearchbar,
  IonSelect,
  IonSelectOption
} from '@ionic/angular';

import { Productos } from '../services/productos';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
  CommonModule,
  FormsModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSpinner,
  IonSearchbar,
  IonSelect,
  IonSelectOption
],
})
export class Tab1Page implements OnInit {

  productos: any[] = [];  
  cargando = false;
  mensajeError = '';

  productosFiltrados:any[] = [];
  textoBusqueda = '';

  categorias: string[] = [];
  categoriaSeleccionada = 'todas';

  constructor(
    private productosService: Productos,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(){
    this.cargando = true;
    this.mensajeError = '';

    this.productosService.obtenerProductos().subscribe({
      next: (respuesta) => {
        this.productos = respuesta.products;

        this.categorias = [
          ...new Set(this.productos.map(producto => producto.category))
        ];

        this.filtrarProductos();
        this.cargando = false;
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.mensajeError = 'No se pudieron cargar los productos.';
        this.cargando = false;
        this.cd.markForCheck(); 
      }
    });
  } 
filtrarProductos() {
  const texto = this.textoBusqueda.toLowerCase().trim();

  this.productosFiltrados = this.productos.filter(producto => {
    const coincideNombre = producto.title.toLowerCase().includes(texto);

    const coincideCategoria =
      this.categoriaSeleccionada === 'todas' ||
      producto.category === this.categoriaSeleccionada;

    return coincideNombre && coincideCategoria;
  });
}

}
