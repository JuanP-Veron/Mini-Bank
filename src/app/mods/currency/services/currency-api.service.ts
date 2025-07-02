import { Injectable } from "@angular/core";
import { AppApiService } from "../../../shared/services/app-api.service";
import { Observable } from "rxjs";
import { Currency } from "../models/currency-model";

@Injectable({
    providedIn: 'root'
})

export class CurrencyApiService {
    private apiUrl= 'http://54/api/Currency';

    constructor(private api: AppApiService) {  }

    getCurrencyList(): Observable<Currency[]> {
        return this.api.get<Currency[]>(`${this.apiUrl}/all`)
    }
}