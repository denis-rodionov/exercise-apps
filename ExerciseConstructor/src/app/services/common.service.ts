import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sentence, TextType } from '../model/sentence';


@Injectable()
export class CommonService {

    constructor(private http: HttpClient) {
    }

    shuffle(arr) {
        let newArray = new Array<string>();

        while (arr.length) {
            const i = Math.floor(Math.random() * arr.length);
            newArray = newArray.concat(arr.splice(i, 1));
        }

        return newArray;
    }

    getHeader(headertext: string, withTable: boolean = true) {
        return '<div class=\"ew-exercise\"><p>' + headertext + '</p>' + (withTable ? '<table class="ew-table">' : '');
    }

    getFooter(withTable: boolean = true) {
        // tslint:disable-next-line:max-line-length
        return (withTable ? '</table>' : '') +  '<div class="ew-controls"><a class="ew-button" id="ew-check-results" href="#" draggable="false">Проверить</a></div><div id="ew-result-text"></div></div>';
    }

    getCombinedDocument(html: string, css: string, js: string): string {
        return '<style>' + css + '</style>' + html + '<script>' + js + '</script>';
    }

    getTextFromFile(fileName: string): Observable<string> {
        return this.http.get(fileName, {responseType: 'text'});
    }

    getQuestionContent(text: string, textType: TextType) {
        switch (textType) {
          case TextType.Text:
          case TextType.Separator:
            return text;
          case TextType.AudioLink:
            return '<audio controls><source src="' + text + '">Ваш браузер не поддерживает аудио</audio>';
        }
    }
}
