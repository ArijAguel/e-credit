import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    private apiUrl = '/api/upload'; // Note the '/api' prefix

    constructor(private http: HttpClient) {}

    uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.apiUrl, formData)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error('Error uploading file:', error);
                    return throwError('Error uploading file. Please try again.');
                })
            );
    }
}