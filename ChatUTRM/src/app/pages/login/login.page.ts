import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SocketServiceService } from '../../services/socket-service.service';
import { UserService } from '../../services/user.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string;
  public password: string;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private socketService: SocketServiceService,
    public generalService: GeneralService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  redirect(url) {
    this.router.navigateByUrl(url);
  }

  async signIn(){
    console.log(this.username, this.password);

    if(this.username && this.password ) {
      const user = {
        condition: {
          username: this.username,
          password: this.password
        }
      };
      const query: any = await this.userService.login(user);
      console.log(query);
      if(query && query.ok){
        localStorage.setItem('userId', query.user.id);
        this.socketService.login(query.user);
        await this.router.navigate(['/contactos'], { queryParams: query.user });
        //this.redirect('/home/tab1');
      } else {
        await this.generalService.presentAlert('Error', '', 'User not found');
      }
    } else {
      await this.generalService.presentAlert('Error', '', 'User not found');
    }
  }
}