import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiResponse, Parte } from "../interfaces/interfaces";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ParteService {
    private apiUrl = 'http://localhost:3000/api';
    private http = inject(HttpClient);
    private partes: Parte[] = [];

    // API

    getPartes = (): Observable<ApiResponse<Parte[]>> => {
        return this.http.get<ApiResponse<Parte[]>>(`${this.apiUrl}/partes`)
    };

    createParte = (parte: Parte): Observable<ApiResponse<Parte>> => {
        return this.http.post<ApiResponse<Parte>>(`${this.apiUrl}/parte`, parte);
    };

    updateParte = (parte: Parte): Observable<ApiResponse<Parte>> => {
        return this.http.put<ApiResponse<Parte>>(`${this.apiUrl}/parte`, parte);
    };

    deleteParte = (id: number) => {
        this.http.delete(`${this.apiUrl}/parte/${id}`);
    }

    getParteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/partes/${id}`);
    }
}