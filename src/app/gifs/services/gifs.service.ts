import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'mUMBK9yUSaikaomOkKw6XjuBOafyHVp5'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  private _historial: string[] = []
  public resultados: Gif[] = [] //el tipado Gif se importa de interfaces

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []// el signo ! obliga a que funcione, aqui nos dice si no hay historial que regrese un arreglo vacion ya que getItem requiere eso
    // if ( localStorage.getItem('historial')){ //getItem para obtener el historial almacenado en localStorage en el navegador
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)//JSON.parse para devolver a su forma original el string
    // }//Otra forma de hacer lo de arriba

    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || []
  } //Importacion Modulo Http para hacer peticiones htte estp trabaja en base a observadores

  buscarGifs( query: string = ''){

    query = query.trim().toLocaleLowerCase() //trim para quitar espacios adelante y atras, esta linea nos permite pasar todo a minusculas y evitar que la busqueda se repita independiente si se escribe en mayusculas o minusculas
    
    if (!this._historial.includes(query)){ //para evitar que se repita un valor, al llevar el signo ! estamos negando la afirmacion que nos dice si no esta presente query osea el string que queremos poner entonces agrgarlo de lo contrario no
      this._historial.unshift( query )
      this._historial = this._historial.splice(0,10) //para acotar a 10 el numero de valores que se guardan en el historial 
      localStorage.setItem('historial', JSON.stringify(this._historial));//JSON.stringify para convertir un objeto en string
      
    }
   
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=mUMBK9yUSaikaomOkKw6XjuBOafyHVp5&q=dragon ball z&limit=10') //fetch es de JavaScript
    //   .then( resp => {
    //     resp.json().then(data => console.log(data))
    //   }) La respuesta que nos devuelve son las imagenes de los gifs que busquemos
    
    // this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=10`) // lo mismo que arriba pero ahora con el modulo HttpClient, este es propio de Angular
    // //lo que sea que reciba al query es lo que voy a mandar a la peticion http
    // //get es de tipo generico por eso ponemos el tipado aqui, este tipado viene desde interfaces
    //   .subscribe((resp) =>{ //.subscribe es parecido al then solo se ejecuta cuando tengamos la resolucion del get
    //     console.log(resp.data);
    //     this.resultados = resp.data   
    //     localStorage.setItem('resultado', JSON.stringify(this.resultados))   
    //   }) // al devolver observadores aumenta las posibilidades de lo que podemos hacer y manipular en esta peticion
    
    //---lo mismo de arriba pero mejor estructurado con el objeto HttpParams---------------------------------------
    const params = new HttpParams() //HttpParams-objeto que facilita las peticiones http
                                  .set('api_key', this.apiKey)
                                  .set('limit', '10')
                                  .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params: params}) //a la propiedad params del get le asigno la variable params
      .subscribe((resp) =>{ 
        //console.log(resp.data);
        this.resultados = resp.data   
        localStorage.setItem('resultado', JSON.stringify(this.resultados))   
      })
    }
}
