import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarroEntity } from '../../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  private consultaApiUrl = environment.url_api  + '/carros';

  constructor(
    private http: HttpClient
    ) { }

    /**POST new consulta */
  save(ent: CarroEntity): Observable<CarroEntity> {
    return this.http.post<CarroEntity>(this.consultaApiUrl, ent);
  }

  /**PUT consulta, update an existing consulta*/
  update(ent: CarroEntity): Observable<CarroEntity> {
    return this.http.put<CarroEntity>(this.consultaApiUrl, ent);
  }

    /**DELETE consulta*/
  delete(id:string): Observable<CarroEntity> {
    return this.http.delete<CarroEntity>(this.consultaApiUrl+'/'+id);
  }

  /** GET consulta from the server */
  getAll(): Observable<CarroEntity[]> {
    return this.http.get<CarroEntity[]>(this.consultaApiUrl);
  }
  getByPlaca(placa:string): Observable<CarroEntity[]> {
    return this.http.get<CarroEntity[]>(this.consultaApiUrl+'/'+'placa/'+placa);
  }
  getByProprietario(proprietario:string): Observable<CarroEntity[]> {
    return this.http.get<CarroEntity[]>(this.consultaApiUrl+'/'+'proprietario/'+proprietario);
  }
}