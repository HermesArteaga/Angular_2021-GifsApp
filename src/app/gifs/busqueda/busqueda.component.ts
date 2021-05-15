import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;


  constructor(private gifsServices: GifsService){} //llamado al servicio GifsService

  buscar( ){
    const valor = this.txtBuscar.nativeElement.value

    if (valor.trim().length === 0){ //para evitar que se guerden datos vacios
      return;
    }

    this.gifsServices.buscarGifs(valor) //pasamos el valor de la variable valor al servicio
    this.txtBuscar.nativeElement.value = ''
    
  }

}
