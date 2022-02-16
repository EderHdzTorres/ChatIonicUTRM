import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,    public alertController:AlertController) {

   this.formularioLogin = this.fb.group({
      'nombre': new FormControl ("",Validators.required),
      'password': new FormControl("",Validators.required)
    })

  }
  async ingresar(){
    var f = this.formularioLogin.value;

    var usuario= JSON. parse(localStorage.getItem('usuario'));
    if(usuario.nombre==f.nombre && usuario.password == f.password)
    {
       console.log('Ingresado');
    }
    else{
       const alert = await this.alertController.create({
         header: 'Datos incorrectos',                       
         message: 'Los datos que ingresaste son incorrectos.',
         buttons: ['Aceptar']
       });
      await alert.present();
    }
 
  }

  ngOnInit() 
  {
  }
}