import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { SqliteProvider } from './../../providers/sqlite/sqlite';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
/**
 * Generated class for the NuevoregistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevoregistro',
  templateUrl: 'nuevoregistro.html',
})
export class NuevoregistroPage {
Image = [];
base64Image =[];
Position = [];
registro = [];
latitude = [];
longitude= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private geolocation: Geolocation, public sqliteService: SqliteProvider) {
  }

myDate: String = new Date().toISOString();

 takePicture(){

  this.geolocationNative();

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
     this.Image.push(imageData)
     
    }, (err) => {
     // Handle error
    });

  
  }

  geolocationNative(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.Position[0] = geoposition.coords.longitude.toString();
      this.Position[1] = geoposition.coords.latitude.toString();
      this.longitude.push(geoposition.coords.longitude.toString())
     this.latitude.push(geoposition.coords.latitude.toString())
      //console.log(geoposition);
    }) 
  }

  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

 slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  registroSubmit(registro) {
  this.registro ['created_at'] = this.myDate
  this.registro['project_id'] = this.navParams.data.item.project_id;
  this.registro['task_id'] = this.navParams.data.item.id;
  this.registro['latitude'] = this.latitude;
  this.registro['longitude'] = this.longitude;
  this.registro['images'] = this.Image;
  console.log(this.registro);
  //this.sqliteService.createRegistro(this.registro);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoregistroPage');
  }

}
