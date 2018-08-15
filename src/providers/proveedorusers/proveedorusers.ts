import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/*
  Generated class for the ProveedorusersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProveedorusersProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProveedorusersProvider Provider');
  }

  obtenerUsuarios(){
    return this.http.get('http://10.10.1.86/api01/public/index.php/login/1');
  }

}
