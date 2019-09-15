import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { DataService } from './data.service';
import { take, finalize } from 'rxjs/operators';
import { AlertService } from './alert.service';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  constructor(
    private platform: Platform,
    private data: DataService,
    private afStorage: AngularFireStorage,
    private alert: AlertService
  ) { }

  async takePicture(afStoragePath: string, downloadURLPath: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        source: CameraSource.Prompt,
        resultType: CameraResultType.Base64
      });

      await this.uploadPicture(image.base64String, afStoragePath, downloadURLPath);
    } catch (error) {
      console.error(error);
    }
  }

  async uploadPicture(image, afStoragePath: string, downloadURLPath: string) {
    try {
      const ref = this.afStorage.ref(afStoragePath);
      ref.putString(image, 'base64', { contentType: 'image/jpeg' }).then(() => {
        return ref.getDownloadURL().pipe(take(1)).toPromise().then(url => {
          // TODO return url and move update to calling method
          this.data.updateAt(afStoragePath, { [downloadURLPath]: url });
        });
      });

    } catch (error) {
      console.error('err: ' + error);
    }
  }

  async uploadFile(event: FileList, afStoragePath: string, downloadURLPath: string) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      this.alert.customMessage('Unsupported file!', 'Only image files are allowed');
      return;
    }
    const ref = this.afStorage.ref(afStoragePath);
    // finalize(() => {
    return ref.put(file).then(() => {
      return ref.getDownloadURL().pipe(take(1)).toPromise().then(url => {
        // TODO return url and move update to calling method
        this.data.updateAt(afStoragePath, { [downloadURLPath]: url });
      });
    });
    // });
  }

  async getPlatform() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      return 'mobile';
    } else {
      return 'browser';
    }
  }


  /* ----------------------------------------------------------------

     Web environment specific methods - used for Progressive Web Apps

     ---------------------------------------------------------------- */

  // https://capacitor.ionicframework.com/docs/pwa-elements/
}
