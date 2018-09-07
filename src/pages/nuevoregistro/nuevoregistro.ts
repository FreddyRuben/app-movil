import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { SqliteProvider } from './../../providers/sqlite/sqlite';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-nuevoregistro',
  templateUrl: 'nuevoregistro.html',
})
export class NuevoregistroPage {
item;
project_id;
Image = [];
base64Image = [];
Position = [];
registro = [];
latitude:string ;
longitude:string ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private geolocation: Geolocation, public sqliteService: SqliteProvider, public http: Http) {
 this.item = navParams.data.item;
  }

// myDate: String = new Date().toISOString();

 takePicture(){

  //this.geolocationNative();
 this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 600
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     
     this.base64Image.push('data:image/jpeg;base64,' + imageData)
    this.Image.push({image:'data:image/jpeg;base64,'+imageData,latitude:geoposition.coords.latitude.toString(),longitude:geoposition.coords.longitude.toString()})
    // this.Image.push(imageData)
     
    }, (err) => {
     // Handle error
    });

   }) 
  }

  /*geolocationNative(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.longitude = geoposition.coords.longitude.toString();
      this.latitude = geoposition.coords.latitude.toString();
      //this.longitude.push(geoposition.coords.longitude.toString())
     //this.latitude.push(geoposition.coords.latitude.toString())
      //console.log(geoposition);
    }) 
  }
*/
  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

 slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  registroSubmit(registro) {
    console.log('Este es el', registro);
    
  let test2= [];
  test2.push(this.registro)
  console.log (test2[0]);
  this.sqliteService.createRegistro( this.registro, this.navParams.data.item.id);
  }

/*
 ticketSubmit(ticket) {
  this.ticket['created_at'] = this.myDate;
  this.ticket['project_id'] = this.navParams.data.item.project_id;
   this.ticket['task_id'] = this.navParams.data.item.id;
  
 
 this.sqliteService.create(this.ticket);
  }
*/

  ionViewDidLoad() {
    console.log('inicio LoginPage');
    let data = {
        name: 'paul rudd',
        movies: [ 'I Love You Man', 'Role Models' ]
    };
    this.http.post('http://192.168.100.6/api/public/index.php/api/registros', data).subscribe((data) => {
        console.log(data.json());
    });
   
    console.log('ionViewDidLoad NuevoregistroPage');
  }

}
