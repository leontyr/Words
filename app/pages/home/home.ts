import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {Word} from '../../word';
import {WordService} from '../../word.service';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
    allWords: Word[];
    words: Word[];
    searchQuery: string;
    errorMessage: string;
    snd: HTMLAudioElement;
    sndAll: HTMLAudioElement;
    soundIndex: number = 0;

    constructor(private _wordService: WordService) { }

    ngOnInit() {
        this.searchQuery = '';
        this.initializeItems();
        this.snd = new Audio();
        this.sndAll = new Audio();
    }

    initializeItems() {
        if (!this.allWords)
            this.getWords();
        else
            this.words = this.allWords;
    }

    getWords() {
        this._wordService.getWords()
            .subscribe(
            words => {
                this.allWords = words;
                this.words = words;
            },
            error => this.errorMessage = <any>error);
    }

    getItems(searchbar) {
        // Reset items back to all of the items
        this.initializeItems();

        // set q to the value of the searchbar
        var q = searchbar.value;

        // if the value is an empty string don't filter the items
        if (q.trim() == '') {
            return;
        }

        this.words = this.words.filter((v) => {
            if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        })
    }

    play(url) {
        this.snd.src = url;
        this.sndAll.pause();
        this.snd.play();
    }

    playAll(url) {
        this.sndAll.src = 'data/' + this.allWords[this.soundIndex].name + '.mp3';
        this.sndAll.addEventListener("ended", this.playNext);
        this.sndAll.play();
    }

    playNext = () => {
        if (this.soundIndex < this.allWords.length - 1) {
            this.soundIndex++;
            this.sndAll.src = 'data/' + this.allWords[this.soundIndex].name + '.mp3';
            this.sndAll.play();
        } else {
            this.soundIndex = 0;
        }
    }
}