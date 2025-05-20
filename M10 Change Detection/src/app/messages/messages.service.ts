import { Injectable, signal } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages: string[] = [];
  messages$ = new  BehaviorSubject<string[]>([]);

  public get allMessages() : string[] {
    return [...this.messages]
  }

  addMessage(message: string) {
    this.messages = [...this.messages, message];
    this.messages$.next([...this.messages]);
  }
} 