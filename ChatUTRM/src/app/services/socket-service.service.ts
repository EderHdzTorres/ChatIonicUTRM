import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  public message$: BehaviorSubject<any> = new BehaviorSubject('');
  public onlineUsers$: BehaviorSubject<any> = new BehaviorSubject('');
  public getNewMessage$: BehaviorSubject<any> = new BehaviorSubject('');

  socket = io(environment.url, {});

  constructor() { }

  public login(user) {
    this.socket.emit('login', user);
  }

  public paginaRecargada(userId) {
    this.socket.emit('paginaRecargada', userId);
  }

  public usuariosConectados() {
    this.socket.on('usuariosConectados', (users) => {
      this.onlineUsers$.next(users);
    });
    return this.onlineUsers$.asObservable();
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getOnlineUsers() {
    this.socket.on('new-user-online', (users) => {
      this.onlineUsers$.next(users);
    });
    return this.onlineUsers$.asObservable();
  }

  public getNewMessage() {
    this.socket.on('new-message', (message) => {
      this.getNewMessage$.next(message);
    });

    return this.getNewMessage$.asObservable();
  };



}