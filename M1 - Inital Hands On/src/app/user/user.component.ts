import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';

// we can also use type User = here
interface User { 
  id: string,
  name: string,
  avatar: string
}
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Output() select = new EventEmitter<string>(); // TYPE OF value to be emitted

  /**
   * same as above, this creates the object of event emitter behing the scenes
   * this does not create a signal rather create a event emitter object.
   * there is no change in how this is being used.
   */
  select2 = output<string>(); 

  get getImagePath() {
    return '../assests/users/' + this.user.avatar;
  }

  /**
   * can also be done like below using angular signal
   * Using input from angular singal doesnt change anything regarding how this value will be
   * accessed from outside the component. It will be done in same way as with Input()
   * 
   * 
   * name = input(''); can pass default value
   * name = input.required() can not pass default value as it a required field
   * 
   * computed also creates a signal of its own and we need to use it like getImagePath()
   * getImagePath = computed(() => { return '../assests/users/' + this.avatar;})
   */

  onSelectedUser(): void {
    this.select.emit(this.user.id);
  }
}
