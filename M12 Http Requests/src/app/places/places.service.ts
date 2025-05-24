import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  private httpClient = inject(HttpClient);

  loadAvailablePlaces() {
    const url = 'http://localhost:3000/places';
    const message = "Error fetching Places, Please try again later!!";
    return this.fetchPlaces(url, message);
  }

  loadUserPlaces() {
    const url = 'http://localhost:3000/user-places';
    const message = "Error fetching Favourite Places, Please try again later!!";
    return this.fetchPlaces(url, message)
    .pipe(
      tap({
        next: (data)=> this.userPlaces.set(data)
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    this.userPlaces.update(prevPlaces => [...prevPlaces, place])
    return this.httpClient.put('http://localhost:3000/user-places',
      {
        placeId: place.id
      }
    )
  }

  removeUserPlace(place: Place) { }

  private fetchPlaces(url: string, message: string) {
    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error.message)
          return throwError(() =>
            new Error());
        })
      )
  }
}
