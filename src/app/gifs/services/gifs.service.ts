import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse }    from "../interfaces/gifs.interfaces";

@Injectable({ providedIn: 'root' })
export class GifsService {


    public gifList: Gif[] = [];

    private _tagsHistory: string[] =  [];
    private _urlBase: string = 'https://api.giphy.com/v1/gifs';
    private apiKey: string = '3Pn3ntrVBwNVBmTL8nZztg42UcLTB57u';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();

        if(this._tagsHistory.length == 0) return;

        this.searchTag(this._tagsHistory[0]);

    }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    organizeHistory(tag: string) {
        tag = tag.toLowerCase();

        if ( this._tagsHistory.includes(tag) ) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }

        this._tagsHistory.unshift(tag)
        this._tagsHistory= this._tagsHistory.slice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage(): void {
        if(!localStorage.getItem('history')) return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    }

    searchTag(tag: string): void  {
        if ( tag.trim() === '' ) return;
        this.organizeHistory(tag);

        // const response = await fetch(`${this._urlBase}?api_key=${this.apiKey}&q=${tag}&limit=10`);
        // const data = await response.json();

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)
            .set('lang', 'es')

        this.http.get<SearchResponse>(`${this._urlBase}/search`, {
            params
        })
            .subscribe((resp ) => {
                this.gifList = resp.data;
            });


    }
}
