import { Component, DestroyRef, inject } from '@angular/core';
import { interval, timeInterval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  private destroyRef = inject(DestroyRef);

  private intereval?: ReturnType<typeof setInterval>;
  constructor() {}

  ngOnInit(): void {
    this.intereval = setInterval(() => { 
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

    // Alternative to ngOnDestroy
    this.destroyRef.onDestroy(()=>{
      // clearInterval(interval); declare interval of type const and not ReturnType.. for this usage
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.intereval)
  }
}
