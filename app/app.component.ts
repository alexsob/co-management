import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

//import { BuildService } from './build.service';
import { CorporationComponent } from './corp.component';
import { VotingComponent } from './corp.component';
import { BoardMembers} from './corp.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Tenants']">Tenants</a>
      <a [routerLink]="['Voting']">Voting</a>
      <a [routerLink]="['Boardmembers']">Board Members</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  // styleUrls: ['./app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS
  ]
})
@RouteConfig([
  {
    path: '/tenants',
    name: 'Tenants',
    component: CorporationComponent,
    // useAsDefault: true
  },
  {
    path: '/voting',
    name: 'Voting',
    component: VotingComponent,
    // useAsDefault: true
  },
  {
    path: '/boarmembers',
    name: 'Boardmembers',
    component: BoardMembers,
    // useAsDefault: true
  }
  
])
export class AppComponent {
  title = 'Main Menu';
}


