import {
  Component,
  EventEmitter
} from 'angular2/core';

import {OnInit} from 'angular2/core';
import {BuildService} from './build.service';
import {bootstrap} from 'angular2/platform/browser';
import {corporation} from './corp.interf';
import {TenantFormComponent} from './tenant-form.component.ts';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Apartment
@Component({
	selector: 'apartment',
    inputs: ['build','bfn', 'ap', 'ap_image', 'tenant_last_name', 'tenant_first_name','build_color'],
    directives: [TenantFormComponent],
    template: `
        <div  style="margin-left:45px; background-color: {{build_color}}">
        Apartment: {{ap}}
        <img (click)="onApclick()" [src] = "ap_image" width="25" height="25" style="cursor: pointer">
        <!-- <tenant-form *ngIf="trigger"></tenant-form> -->

        <label *ngIf="trigger">Tenant Last Name:</label> <input *ngIf="trigger" [(ngModel)]=tenant_last_name>
        <label *ngIf="trigger">Tenant First Name:</label> <input *ngIf="trigger" [(ngModel)]=tenant_first_name>
        
    `
})
class ApartmentComponent{
    public ap:number;
    public tenant_last_name: string;
    public tenant_first_name: string;
    public trigger: boolean = false;
    public ap_image: string;
    public build_color: string;
    
    onApclick(){
        if (this.trigger == false)
            this.trigger = true;
        else
            this.trigger=false;   
    }

    
    ngOnInit(){
       console.log("Inside ApartmentComponent: " + this.build_color);
    }    
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Floors
@Component({
	selector: 'floor',
    inputs: ['build','bfn', 'build_i', 'floor_i','build_color'],
    directives: [ApartmentComponent],
    template: `
        <h4 style="color:darkgreen;margin-left:30px;">Floor: {{bfn}}</h4>  
        <div>
            <apartment class="badge"
              *ngFor="#theAp of mycorp.build[build_i].floors[floor_i].aps"
                [ap] = theAp.ap_num
                [tenant_last_name] = theAp.tenant.last_name
                [tenant_first_name] = theAp.tenant.first_name
                [ap_image] = ap_image
                [build_color] = build_color
            ></apartment>
        </div>
    `
})
class FloorComponent{
    public mycorp:corporation;
    public ap_image;
    /*
    public build: number;
    public bfn: number;
    public build_i:number;
    public floor_i: number;
    */
    
    constructor(private _buildService: BuildService){
    }
    ngOnInit(){
        this.mycorp = this._buildService.getData();
        this.ap_image = this.mycorp.ap_image;
        console.log("inside FloorComponent: " + this.ap_image);
    }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// >>>>>>>>>>>>>>>>>>>>>>>> Building
@Component({
	selector: 'building',
    inputs: ['build','bfn', 'build_i', 'build_color'],
    directives: [FloorComponent],
    template: `
        <h3 style="color:firebrick;margin-left:15px;">Building: {{build}}</h3>
        <div>
            <floor
             *ngFor="#theFloor of bfn; #i = index"
                  [bfn] = theFloor 
             [build] = build 
             [build_color] = build_color
             [build_i] = build_i
             [floor_i] = i   
            ></floor>
            <p></p>
        </div>
    `
})
class BuildingComponent{
    
    public build: number;
    public bfn: number;
    public build_i:number;
    public floor_i: number;
    public build_color: string;
    
    constructor(){}

    ngOnInit(){
            console.log("Inside BuildingComponent: " + this.build + " " + this.build_color);
        }
 
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CorpComponent
@Component({
	selector: 'my-corp',
    directives: [BuildingComponent],
    providers: [BuildService],
    template: `
    <div class='corporation'>
        <h2 style="color:blue;margin-left:130px;">Corporation number {{corp_num}}</h2>
        <p>
        <building
            *ngFor="#bld of build_num; #i = index"
                [build] = "bld"
                [build_i] = i
                [bfn] =  build_floors_num[i]  
                [build_color] = build_color[i]
        >    
        </building>
        </p>
    </div>
    `
})
export class CorporationComponent implements OnInit{
    public corp_num:number;
    public build_num:number[] = [];
    public build_floors_num:number[][] = [];
    public mycorp:corporation;
    public build_color: string[] = [];
    
    constructor(private _buildService: BuildService){
    }
    ngOnInit(){
        this.mycorp = this._buildService.getData();
        this.corp_num = this.mycorp.corp_num;
        
        for (var x:number=0; x < this.mycorp.build.length; x++){
            this.build_num[x] = this.mycorp.build[x].build_num;
            this.build_floors_num[x] = this.mycorp.build[x].build_floors;
            this.build_color[x] = this.mycorp.build[x].build_color;
            console.log("Inside CorporationComponent: " + this.build_color[x]);
        }
    }
 }

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
@Component({
  selector: 'my-voting',
  //templateUrl: 'app/corp.component.js',
  template: `
  <h3>Corporation Voting</h3>
  <button (click)="goBack()">Back</button>
  `
})
export class VotingComponent {
    goBack() {
        // window.history.back();
    }
 }
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
@Component({
  selector: 'my-boar-members',
  template: '<h3>Board Memebers</h3>'
})
export class BoardMembers { }
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

