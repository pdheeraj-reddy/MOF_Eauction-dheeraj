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
        return this.config
    }

    public loadConfig() {
        return this.http.get('properties/environment.json').toPromise().then((config: any) => {
            this.config = config;
            // this.configSubject$.next(this.config);
        }).catch((err: any) => {
            console.error(err);
        })
    }

}




