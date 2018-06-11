import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html',
})
export class PicturePage {
  base64Image : string;
  Position = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private geolocation: Geolocation) {
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });

    this.geolocationNative();
  }

  geolocationNative(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.Position[0] = geoposition.coords.longitude.toString();
      this.Position[1] = geoposition.coords.latitude.toString();
      //console.log(geoposition);
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePage');
  }

}
