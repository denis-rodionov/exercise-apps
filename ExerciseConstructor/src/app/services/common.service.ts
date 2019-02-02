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
}