import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

import { UserService } from '../../services/user.service';
import { GeneralService } from '../../services/general.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class SignupPage implements OnInit {

  public user = {
    username: '',
    password: '',
    email: ''
  };
  constructor(private userService: UserService, public generalService: GeneralService, private router: Router,) { }

  redirect(url) {
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
  }


  public async regiterUser() {
    const query: any = await this.userService.createUser(this.user);
    console.log(query);
    if(query && query.ok) {
      const alert = await this.generalService.presentAlert('Exitoso', '', 'Usuario creado correctamente');
      localStorage.setItem('TK1983!','ASDFASD');
      this.redirect('/contactos');

    } else {
      await this.generalService.presentAlert('Error', '', 'Usuario no creado');
    }


    //localStorage.setItem('usuario', JSON.stringify(usuario));

    //
    localStorage.setItem('ingresado','true');
    //this.navCtrl.navigateRoot('contactos');
    

  }

}