import {corp_data} from './mock-data';
import {Injectable} from 'angular2/core';

@Injectable()
export class BuildService {
    getData(){
        return corp_data;
    }
}
