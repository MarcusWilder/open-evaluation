import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-global-navigation',
  templateUrl: './global-navigation.component.html',
  styleUrls: ['./global-navigation.component.css']
})
export class GlobalNavigationComponent {

  @Input() name: string;
  @Input() buttonText: string;
  @Input() callback: () => void;
  @Input() set tabs(collection: string[]) {
    this.tabCollection = [];
    for (let ind = 0; ind < collection.length; ind++) {
      if (ind === 0) {
        this.tabCollection.push({name: collection[ind], active: true});
      } else {
        this.tabCollection.push({name: collection[ind], active: false});
      }
    }
    this.activeTab.emit(this.tabCollection[this.currActive]['name']);
  }

  @Output() activeTab = new EventEmitter<string>();

  currActive = 0;
  tabCollection: object[];

  changeActive(ind: number) {
    this.tabCollection[this.currActive]['active'] = false;
    this.tabCollection[ind]['active'] = true;
    this.currActive = ind;
    this.activeTab.emit(this.tabCollection[this.currActive]['name']);
  }

}
