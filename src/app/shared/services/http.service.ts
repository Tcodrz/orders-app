import { IUser } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IAdvertiser } from '../models/advetiser.model';
import { ICustomer } from '../models/customer.model';
import { INarrator } from '../models/narrator.model';
import { IOrder } from './../models/order.model';

export interface ApiResponse {
  data: any;
  error: boolean;
  amount: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(user: { username: string; password: string }): Observable<IUser> {
    return this.http.post<ApiResponse>(`${this.api}/auth`, user).pipe(
      map((resp: ApiResponse) => resp.error ? null : resp.data)
    );
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<ApiResponse>(`${this.api}/orders`).pipe(
      map((resp: ApiResponse) => resp.error ? [] : resp.data)
    );
  }

  deleteOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<ApiResponse>(`${this.api}/orders/remove`, order).pipe(
      map((resp: ApiResponse) => resp.error ? null : resp.data)
    );
  }

  getAllCustomers(): Observable<ICustomer[]> {
    return this.http.get<ApiResponse>(`${this.api}/customers`).pipe(
      map((resp: ApiResponse) => resp.error ? [] : resp.data)
    );
  }

  getAllAdvertisers(): Observable<IAdvertiser[]> {
    return this.http.get<ApiResponse>(`${this.api}/advertisers`).pipe(
      map((resp: ApiResponse) => resp.error ? [] : resp.data)
    );
  }

  getAllNarrators(): Observable<INarrator[]> {
    return this.http.get<ApiResponse>(`${this.api}/narrators`).pipe(
      map((resp: ApiResponse) => resp.error ? [] : resp.data),
      tap((narrators: INarrator[]) => narrators.map(n => n.price = 0))
    );
  }

  addOrUpdateOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<ApiResponse>(`${this.api}/orders`, order)
      .pipe(
        map((resp: ApiResponse) => resp.error ? [] : resp.data)
      );
  }
}
