import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private plt: Platform) { }

  async customMessage(title: string, text: string, buttonText?: string) {
    if (!buttonText) {
      buttonText = 'OK';
    }
    const alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons:
        [
          buttonText
        ]
    });
    await alert.present();
  }

  async showInputAlert(title: string, inputs, buttonText?: string) {
    if (!buttonText) {
      buttonText = 'OK';
    }

    const alert = await this.alertCtrl.create({
      header: title,
      // subHeader: message,
      inputs: inputs,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            alert.dismiss({ status: true, value: data });
            return false;
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss({ status: false, value: {} });
            return false;
          }
        }
      ]
    });
    await alert.present();
    const choice = await alert.onDidDismiss();
    return choice;
  }

  async conformation(title: string, text: string, buttonText?: string) {
    if (!buttonText) {
      buttonText = 'OK';
    }
    // const confirm = false;
    const alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons:
        [{
          text: 'Cancel',
        }, {
          text: buttonText,
          role: 'confirm',
          handler: (alertData) => {
            return alertData;
          }
        }]
    });

    await alert.present();
    return await alert.onDidDismiss();
  }

  async dismissAlert() {
    const alert = await this.alertCtrl.dismiss();
  }

  async toast(text: string, milliSeconds?: number) {
    let duration = 2000;
    if (!milliSeconds) {
      duration = 2000;
    } else {
      duration = milliSeconds;
    }

    const toast = await this.toastCtrl.create({
      message: text,
      duration: duration
    });

    toast.present();
  }

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }
}
