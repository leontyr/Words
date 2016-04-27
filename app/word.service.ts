import {Word} from './word';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
// import {Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WordService {
    constructor(private http: Http) { }

    private _wordsUrl = 'data/words.json';

    getWords() {
        return this.http.get(this._wordsUrl)
            .map(res => <Word[]>res.json().data)
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}