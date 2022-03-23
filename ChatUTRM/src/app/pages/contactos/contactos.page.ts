import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  constructor(public alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  //funcion para cerrar sesion
  async salir(){
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Seguro que quieres salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        }, {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('ingresado');
            localStorage.removeItem('TK1983!');
            localStorage.removeItem('userId');
            this.navCtrl.navigateRoot('');

          }
        }
      ]
    });
    await alert.present();
  }

}
