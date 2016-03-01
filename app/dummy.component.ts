import { Component } from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
@Component({
	selector: 'new-app',
    template: '<h3>Hello {{x[0]}}</h3>'
})
export class Dummycomponent{
    public x:number[] = [];  // public x:number[] 
                             // does not work !!!!  
    constructor(){
        this.x[0] = 1;
    }
}

