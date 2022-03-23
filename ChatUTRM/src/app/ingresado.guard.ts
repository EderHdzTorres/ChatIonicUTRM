/*import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IngresadoGuard implements CanActivate {
//se exporta el contructor del navctrl
constructor(public navCtrl: NavController){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('ingresado')){
      return true;
    }else{
      this.navCtrl.navigateRoot('');
    }
  }
  
}*/

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../src/app/services/user-service.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})


export class UserServiceGuard implements CanActivate, CanActivateChild {

  
  public token;

  constructor(private userService: UserServiceService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(next, state);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(next, state);
  }

  private check(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.token = this.userService.getToken();

    if (this.token === null) {
      console.log('no se cuenta con token de acceso');
      //this.messageService.printStatus('Se ha expirado tu sesión, favor de ingresar de nuevo', 'error');
      this.userService.logout();
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }

  }

}

export class IngresadoGuard implements CanActivate {
  //se exporta el contructor del navctrl
  constructor(public navCtrl: NavController){}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('ingresado')){
        return true;
      }else{
        this.navCtrl.navigateRoot('');
      }
    
    }
  }
