import { Component, DestroyRef, inject } from '@angular/core';
import { interval, timeInterval } from 'rxjs';
import {  effect, OnInit, signal } from '@angular/core';

@Component({
    selector: 'app-server-status',
    imports: [],
    templateUrl: './server-status.component.html',
    styleUrl: './server-status.component.css'
})
export class ServerStatusComponent {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');

  private destroyRef = inject(DestroyRef);

  private intereval?: ReturnType<typeof setInterval>;

  constructor(){
    effect(()=>{
      console.log(this.currentStatus());
    })
  }

  ngOnInit(): void {
    this.intereval = setInterval(() => { 
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

    // Alternative to ngOnDestroy
    this.destroyRef.onDestroy(()=>{
      // clearInterval(interval); declare interval of type const and not ReturnType.. for this usage
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.intereval)
  }
  
}
