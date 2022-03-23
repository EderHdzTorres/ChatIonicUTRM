import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private alertController: AlertController) { }

  async presentAlert(h: string, subtitle: string, msn: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: h,
      subHeader: subtitle,
      message: msn,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}