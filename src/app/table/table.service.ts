import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Person } from './table.component';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'http://localhost:3000/items';

  getItems(page: number, limit: number): Observable<any> {
    if (page === 1) {
      return new Observable((observer) => {
        observer.next({ data: PAGE1, total: 10 });
        observer.complete();
      });
    }
    if (page === 2) {
      return new Observable((observer) => {
        observer.next({ data: PAGE2, total: 10 });
        observer.complete();
      });
    }
    return new Observable((observer) => {
      observer.next({ data: [], total: 10 }); 
    });
    //return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}

const PAGE1: Person[] = [
  { name: 'John', age: 25, city: 'New York' },
  { name: 'Jane', age: 30, city: 'Los Angeles' },
  { name: 'Mike', age: 35, city: 'Chicago' },
  { name: 'Sara', age: 28, city: 'Houston' },
  { name: 'Tom', age: 40, city: 'Phoenix' },
];

const PAGE2: Person[] = [
  { name: 'Emma', age: 22, city: 'Philadelphia' },
  { name: 'Liam', age: 27, city: 'San Antonio' },
  { name: 'Olivia', age: 32, city: 'San Diego' },
  { name: 'Noah', age: 29, city: 'Dallas' },
  { name: 'Ava', age: 31, city: 'San Jose' },
];