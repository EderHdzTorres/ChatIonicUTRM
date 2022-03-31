import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {  UserService } from '../../services/user.service';
import {SocketServiceService} from "../../services/socket-service.service";
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  // public messageList = [
  //   { sender: { avatarURL: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png', name: 'Amigo' }, text: 'Hola' },
  //   { sender: { avatarURL: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png', name: 'Amigo' }, text: 'Cómo estás ?' },
  //   { me: { avatarURL: 'https://ionicframework.com/docs/demos/api/list/avatar-han.png', name: 'Yo' }, text: 'Bien gracias, y tu ?' },
  //   ];

  public messageList = [];

  public chatMessage: string = '';
  public selectedUserId: any;
  public myUserId: any;
  public conversationUuid: string;
  public otraPersona: any;
  public token;
  constructor(
    private route: ActivatedRoute, private service: UserService,
     private socketService: SocketServiceService,
     private userService: UserServiceService
     ) {
    console.log(this.messageList);
  }

  async ngOnInit() {
    console.log('init tab');
    this.recargarPagina();
    const user = this.route.snapshot.queryParams;
    if (user && user.userId) {
      this.selectedUserId = parseInt(user.userId, 10);
      this.myUserId  = parseInt(this.service.getId(), 10);
      console.log('El id recibido es '+this.myUserId);
      const payload = {
        sender: this.myUserId,
        receiver: this.selectedUserId
      };
      console.log('El id de la otra persona se supone que es '+this.selectedUserId);
      this.otraPersona=parseInt(this.selectedUserId);
      const query: any = await this.service.loadConversation(payload);

      if(query) {
        this.conversationUuid = query.uuid;
        this.messageList = query.data;
      }
      console.log(query);
    }

    this.socketService.getNewMessage().subscribe((message) => {
      console.log('new message received', message);
      if(message) {
        this.messageList.push(message);
      }
    });

    console.log('init tab', user);
  }

  
  async recargarPagina()
  {    
    this.token = this.userService.getToken();

    if (this.token !== null) 
    {
      this.socketService.paginaRecargada(localStorage.getItem("userId"));

    }


  }

  async sendMessage() {
    console.log(this.chatMessage);
    console.log('El id sigue siendo '+this.myUserId);

    const payload = {
      user_id: this.myUserId,
      conversation_uuid: this.conversationUuid,
      msg: this.chatMessage
    };

    const query: any = await this.service.saveMessage(payload);

    if(query) {
      this.messageList.push(query.data);
      this.socketService.sendMessage({
        id: query.data.id,
        uuid: this.conversationUuid,
        from_id: this.myUserId,
        to_id: this.selectedUserId
      });
    }

    console.log(query);

    // this.messageList.push({
    //   me: { avatarURL: 'https://ionicframework.com/docs/demos/api/list/avatar-han.png', name: 'Yo' }, text: this.chatMessage
    // });

    this.chatMessage = '';
    return true;
  }

}
