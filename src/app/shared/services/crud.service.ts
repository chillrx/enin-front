import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/*Firebase*/
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CrudService {
    url = environment.urlToApi;
    optionsToAuth = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        })
    };

    constructor(private http: HttpClient) { }

    get = (route) => new Promise((resolve, reject) => {
        this.http.get(environment.urlToApi + route, this.optionsToAuth)
            .subscribe(res => resolve(res), rej => reject(rej));
    })

    delete = (route) => new Promise((resolve, reject) => {
        this.http.delete(environment.urlToApi + route, this.optionsToAuth)
            .subscribe(res => resolve(res), rej => reject(rej));
    })

    post = (route, data) => new Promise((resolve, reject) => {
        this.http.post(environment.urlToApi + route, data, this.optionsToAuth)
            .subscribe(res => resolve(res), rej => reject(rej));
    })

    patch = (route, data) => new Promise((resolve, reject) => {
        this.http.patch(environment.urlToApi + route, data, this.optionsToAuth)
            .subscribe(res => resolve(res), rej => reject(rej));
    })

    put = (route, data) => new Promise((resolve, reject) => {
        this.http.post(environment.urlToApi + route, data, this.optionsToAuth)
            .subscribe(res => resolve(res), rej => reject(rej));
    })

}
