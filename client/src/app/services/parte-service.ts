import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiResponse, Parte } from "../../../../shared/interfaces";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ParteService {
    private server_url = 'http://localhost:3000';
    private partes_url = `${this.server_url}/api/parte`;
    private http = inject(HttpClient);
    private partes: Parte[] = [];

    // API

    getPartes = (): Observable<ApiResponse<Parte>> => {
        return this.http.get<ApiResponse<Parte>>(this.partes_url)
    };

    createParte = (parte: Parte): Observable<ApiResponse<Parte>> => {
        return this.http.post<ApiResponse<Parte>>(this.partes_url, parte);
    };

    updateParte = (parte: Parte): Observable<ApiResponse<Parte>> => {
        return this.http.put<ApiResponse<Parte>>(this.partes_url, parte);
    };

    deleteParte = (id: number) => {
        this.http.delete(`${this.partes_url}/${id}`);
    }
}