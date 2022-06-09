import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import data from "src/properties/environment.json";


@Injectable({
    providedIn: 'root'
})
export class EnvService {
    config: any;


    constructor(private http: HttpClient) {
    }
    public get environment() {
        if (!this.config) {
            console.log('get environment', this.config);
        }
        return this.config
    }

    public loadConfig() {
        console.log('loadConfig');
        return this.http.get('properties/environment.json').toPromise().then((config: any) => {
            console.log('loadConfig get', config);
            this.config = config;
            // this.configSubject$.next(this.config);
        }).catch((err: any) => {
            console.error(err);
        })
    }

}




