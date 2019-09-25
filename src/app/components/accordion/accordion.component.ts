import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {

  tabCollection: object[];

  @Input() header:string;
  @Input() callback: () => void;
  @Input() set tabs(collection: string[]) {

  }
}
