import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

<<<<<<< Updated upstream
  constructor(public alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  //funcion para cerrar sesion
=======
  public onlineUsers = [];
  // public user: User;
  public userId: any;

  public token;

  constructor(
    private socketService: SocketServiceService,
    private route: ActivatedRoute,
    private service: UserService,
    private userService: UserServiceService,
    private router: Router,
    public alertController: AlertController,
    public navCtrl: NavController,
    ) {}

  ngOnInit() {
      console.log('Me conctpppppppppppppppppppoooooooooooo');
      this.updateUsers();
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

    this.socketService.recibirUpdate().subscribe((users) => {
      console.log('recibi el eventoooooooooooooas');
      console.log(users);
      if(users) {
        this.onlineUsers = users;
      }
    });
  }

  async navigateToChat(id) {
    await this.router.navigate(['/chat'], { queryParams: { userId: id } } );
  }



>>>>>>> Stashed changes
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
            this.navCtrl.navigateRoot('');

          }
        }
      ]
    });
    await alert.present();
  }

<<<<<<< Updated upstream
}
=======
   updateUsers(){
    this.token = this.userService.getToken();

    if (this.token === null)
    {
      return false;
    }

    else
    {
      this.socketService.update(localStorage.getItem('userId'));
      console.log("El user id enviado es "+localStorage.getItem('userId'));
      return true;
    }

  }

}
>>>>>>> Stashed changes
