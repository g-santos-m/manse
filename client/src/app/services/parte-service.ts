import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiResponse, Parte } from "../interfaces/interfaces";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ParteService {
    // Asegúrate de que esta URL es correcta (ej: localhost:3000/api o localhost:8080/api)
    private apiUrl = 'http://localhost:3000/api';
    private http = inject(HttpClient);

    // GET: Obtener todos
    getPartes = (): Observable<ApiResponse<Parte[]>> => {
        return this.http.get<ApiResponse<Parte[]>>(`${this.apiUrl}/partes`)
    };

    // POST: Crear uno nuevo
    createParte = (parte: Parte): Observable<ApiResponse<Parte>> => {
        return this.http.post<ApiResponse<Parte>>(`${this.apiUrl}/parte`, parte);
    };

    // PUT: Actualizar uno existente
    // CORRECCIÓN: Si /parte/ID da 404, revertimos a /parte y enviamos el ID dentro del objeto
    updateParte = (parte: Parte): Observable<ApiResponse<Parte>> => {
        return this.http.put<ApiResponse<Parte>>(`${this.apiUrl}/parte`, parte);
    };

    // DELETE: Borrar
    deleteParte = (id: number) => {
        return this.http.delete(`${this.apiUrl}/parte/${id}`);
    }
}