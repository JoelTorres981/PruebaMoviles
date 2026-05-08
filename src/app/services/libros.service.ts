import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LibrosService {
    private apiUrl = 'https://openlibrary.org';

    constructor(private http: HttpClient) { }

    // Obtener lista de libros por nombre
    getLibrosDetails(name: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/search.json?q=${name}&limit=20`);
    }

    // Obtener los libros más relevantes/populares
    getTopLibros(): Observable<any> {
        return this.http.get(`${this.apiUrl}/search.json?q=subject:fiction&sort=rating&limit=15`);
    }

    // Obtener detalles completos de un libro
    getWorkDetails(workKey: string): Observable<any> {
        return this.http.get(`${this.apiUrl}${workKey}.json`);
    }

    // Obtener la URL de la portada del libro
    getCoverUrl(coverId: number | string): string {
        return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }
}