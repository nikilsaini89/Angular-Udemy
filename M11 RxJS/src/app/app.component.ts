import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  /**
   * Understanding self made observable
   */
  public clickCount = signal<number>(0);
  private destroyRef = inject(DestroyRef);

  /**
   * Unedrstanding converting signal to observable
   */
  public clickCount$ = toObservable(this.clickCount); // the update from onClick will also be reflected

  /**
   * Understanding converting observable to signals
   */

  public interval$ = interval(5000);
  // observables do not have any initial value, so toSignal method set it to undefined, but we can define
  // it using initialValue in the config object. Also by using toSignal, we do not need to take care of 
  // cleanup, but we can also change it in the configuration by setting manualCleanup to true.
  public intervalSignal = toSignal(this.interval$, {initialValue: 0})

  /**
     * Custom Interval
     */
  customInterval$ = new Observable((subscriber) =>{
    let timesExecuted = 0;

    const inte = setInterval(()=>{
      if(timesExecuted>3){
        clearInterval(inte);
        subscriber.complete();
        return;
      }
      subscriber.next({message: `New Value ${timesExecuted+1}`, value:Math.random().toString()});
      timesExecuted++;
    }, 2000);

  }); 

  ngOnInit(): void {
    /**
     * Understanding self made observable
     */
    const subscription = interval(5000).pipe(
      map((val)=> val*val)
    ).subscribe({  // subscribe method takes a observable object
      next: (val) => console.log(val)
    })
    
    /**
     * Unedrstanding converting signal to observable
     */
    const subs = this.clickCount$.subscribe(
      {
        next: (val) => console.log(`Clicked button ${val} times using signal as Obs`)
      }
    )

    /**
     * Custom Interval
     */
    this.customInterval$.subscribe({
      next: val => console.log(val),
      complete: () => console.log("Completed")
    })

    /**
     * Other
     */

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
      subs.unsubscribe();
    })
  }


  constructor(){
    effect(()=>{
      console.log(`Clicked button ${this.clickCount()} times`);
    })
  }


  onClick(): void{
    this.clickCount.update((prevCount)=>prevCount+1);
  }
  
}
