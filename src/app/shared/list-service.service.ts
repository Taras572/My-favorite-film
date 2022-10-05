import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListServiceService {

    private resourceUrl = environment.BACKEND_URL;
    private api = {
        films: `${this.resourceUrl}films`
    }

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<any> {
        return this.http.get<any>(this.api.films);
    }

    create(movie:any): Observable<any> {
        return this.http.post<any>(this.api.films, movie);
    }

    getbyID(id:number): Observable<any>{
        return this.http.get<any>(`${this.api.films}/${id}`);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.api.films}/${id}`);
    } 
}
