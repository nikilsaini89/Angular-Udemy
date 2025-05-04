import { Component, effect, OnInit, signal } from '@angular/core';
import { timeInterval } from 'rxjs';

@Component({
    selector: 'app-server-status',
    imports: [],
    templateUrl: './server-status.component.html',
    styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit{
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');

  constructor(){
    effect(()=>{
      console.log(this.currentStatus());
    })
  }

  ngOnInit(): void {
    setInterval(() => { 
      const rnd = Math.random();
      if(rnd<0.4){
        this.currentStatus.set('online');
      }
      else if(rnd>0.7){
        this.currentStatus.set('offline');
      }
      else{
        this.currentStatus.set('unknown');
      }
    }, 2000)
  }
  
}
