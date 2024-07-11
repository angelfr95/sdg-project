import { HttpClient } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { environment } from "../../src/environments/environment";
import { Observable } from "rxjs";
import { CountryInfoDto } from "../models/CountryInfoDto";

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private basePath = '/';

    constructor(
        private httpClient: HttpClient, 
    ) {
        this.basePath = environment.API_BASE_PATH
    }

    getAllCountries(): Observable<Array<CountryInfoDto>> {        
        return this.httpClient.get<Array<CountryInfoDto>>(`${this.basePath}/all`);
    }

    getRegionByName(region: string): Observable<Array<CountryInfoDto>> {        
        return this.httpClient.get<Array<CountryInfoDto>>(`${this.basePath}/region/${region}`);
    }

}