import {Component, OnInit} from '@angular/core';
import { SocketServiceService } from '../../services/socket-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})

// export interface User {
//   id: number;
//   username: string;
//   password: string;
//   socket_id: string;
//   online: boolean;
//   avatar: string;
// };

export class ContactosPage implements OnInit {

  public onlineUsers = [];
  // public user: User;
  public userId: any;


  constructor(
    private socketService: SocketServiceService,
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router,
    public alertController: AlertController,
    public navCtrl: NavController
    ) {}

  ngOnInit() {
      console.log('Me conctpppppppppppppppppppoooooooooooo');

    this.userId = this.service.getId();
    // console.log('init tab');
    // this.user = this.route.snapshot.queryParams;
    // console.log('init tab', this.user);

    // if(this.user){
    //   this.user.id = parseInt(this.user.id, 10);
    // }

    console.log('user in tab', this.userId);
    this.socketService.getOnlineUsers().subscribe((users) => {
      console.log('users connected', users);
      if(users) {
        this.onlineUsers = users;
      }
    });
  }

  async navigateToChat(id) {
    await this.router.navigate(['/chat'], { queryParams: { userId: id } } );
  }

  hola(){
    console.log('hola');
  }


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