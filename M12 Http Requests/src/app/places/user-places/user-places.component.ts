import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  imports: [PlacesContainerComponent, PlacesComponent],
  styleUrl: './user-places.component.css',
})
export class UserPlacesComponent {
  error = signal('');
  public isFetching = signal(false);
  private placesService = inject(PlacesService)
  places = this.placesService.loadedUserPlaces;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
      this.isFetching.set(true)
      const subs = this.placesService.loadUserPlaces()
      .subscribe(
        {
          error: (error: Error) => this.error.set(error.message),
          complete: () => this.isFetching.set(false)
        }
      )
      this.destroyRef.onDestroy(() => {
        subs.unsubscribe();
      });
    }
}
