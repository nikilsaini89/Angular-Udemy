import { Component } from '@angular/core';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent {
  currentStatus : 'online' | 'offline' | 'unknown' = 'online';
  constructor() {
    setInterval(() => { 
      const rnd = Math.random();
      if(rnd<0.4){
        this.currentStatus = 'online';
      }
      else if(rnd>0.7){
        this.currentStatus = 'offline';
      }
      else{
        this.currentStatus = 'unknown';
      }
    }, 2000)
  }
}
