import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {
  private messageService = inject(MessagesService);
  // private cdRef = inject(ChangeDetectorRef)
  // private destroyRef = inject(DestroyRef);
  messages: string[] = [];

  // ngOnInit(): void {
  //   const subscription = this.messageService.messages$.subscribe(
  //     (messages)=>{
  //       this.messages = messages;
  //       this.cdRef.markForCheck(); // Marking for changes manually.
  //     }
  //   )
  //   this.destroyRef.onDestroy(()=>{
  //     subscription.unsubscribe();
  //   });
  // }

  /** 
   * Alternative - Async Pipe
   */

  messages$ = this.messageService.messages$;
  
  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
