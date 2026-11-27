import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable ({
    providedIn: 'root'
})
export class Productos {

    constructor (private http: HttpClient) {}

    obtenerProductos(): Observable<any> {
        return this.http.get<any>(environment.apiUrl);
    }
}