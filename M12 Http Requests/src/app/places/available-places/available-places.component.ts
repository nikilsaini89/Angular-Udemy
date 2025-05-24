import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent ],
})
export class AvailablePlacesComponent implements OnInit{
  places = signal<Place[] | undefined>(undefined);
  error = signal('');
  public isFetching = signal(false);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true)
    const subs = this.placesService.loadAvailablePlaces()
    .subscribe(
      {
        next: (places) => this.places.set(places),
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false)
      }
    )
    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
    });
  }

  onSelectplace(places: Place): void{
    this.placesService.addPlaceToUserPlaces(places).subscribe({
      next: (response)=>console.log(response)
    })
  }
}
