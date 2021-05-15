import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent{

  get resutados(){
    return this.GifsService.resultados
  }

  constructor(private GifsService: GifsService) { }

}
