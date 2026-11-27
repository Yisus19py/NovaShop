import { Component, OnInit } from '@angular/core';
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
  IonSpinner
} from '@ionic/angular';

import { Productos } from '../services/productos';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
  CommonModule,
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
  IonSpinner
],
})
export class Tab1Page implements OnInit {

  productos: any[] = [];  
  cargando = false;
  mensajeError = '';

  constructor(private productosService: Productos) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(){
    this.cargando = true;
    this.mensajeError = '';

    this.productosService.obtenerProductos().subscribe({
      next: (respuesta) => {
        this.productos = respuesta.products;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.mensajeError = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }
}
