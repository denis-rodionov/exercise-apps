import { Injectable } from "@angular/core";


@Injectable()
export class CommonService {

    constructor() {
    }

    shuffle(arr) {
        let newArray = new Array<string>();

        while (arr.length) {
            const i = Math.floor(Math.random() * arr.length);
            newArray = newArray.concat(arr.splice(i, 1));
        }

        return newArray;
    }

    getHeader(headertext: string) {
        return '<div class=\"ew-exercise\"><p>' + headertext + '</p><table class="ew-table">';
    }

    getFooter() {
        // tslint:disable-next-line:max-line-length
        return '</table><div class="ew-controls"><a class="ew-button" id="ew-check-results" href="#" draggable="false">Проверить</a></div><div id="ew-result-text"></div></div>';
    }
}