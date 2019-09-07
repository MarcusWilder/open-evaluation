import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-global-navigation',
  templateUrl: './global-navigation.component.html',
  styleUrls: ['./global-navigation.component.css']
})
export class GlobalNavigationComponent {

  @Input() appName: string;
  tabCollection: object[];

  @Input() set tabs(collection: string[]) {
    this.tabCollection = [];
    for (let ind = 0; ind < collection.length; ind++) {
      this.tabCollection.push({name: collection[ind], active: false});
    }
  }
}
