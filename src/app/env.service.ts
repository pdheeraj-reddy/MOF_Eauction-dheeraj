import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import data from "../properties/environment.json";


@Injectable({
    providedIn: 'root'
})
export class EnvService {
    config: any = data;


    constructor(private http: HttpClient) {
    }

    public get environment() {
        // if (!this.config) {
        // }
        return this.config
    }

    // public loadConfig() {
    //     // this.config = data;
    //     return this.http.get('properties/environment.json').toPromise().then((config: any) => {
    //         this.config = config;
    //         // this.configSubject$.next(this.config);
    //     }).catch((err: any) => {
    //         console.error(err);
    //     })
    // }

}




