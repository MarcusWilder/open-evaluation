import { Component } from '@angular/core';
import { ToastService } from '@src/app/services/toast/toast.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private toastService: ToastService) {}

  activeTab: string;
  buttons = [
    {type: 'destructive', content: 'Discard' },
    {type: 'brand', content: 'Save' },
    {type: 'success', content: 'Submit' }
  ];
  firstName: string;
  lastName: string;
  options = [
    {name: 'CS 1331', header: true},
    {name: 'Survey 1', header: false},
    {name: 'Survey 2', header: false},
    {name: 'CS 1332', header: true},
    {name: 'Survey 3', header: false},
    {name: 'Survey 4', header: false},
    {name: 'Survey 5', header: false}
  ];
  rankings = [1, 2, 3, 4, 5];
  selection: unknown;
  tabs = ['Home', 'Features', 'Resources'];

  submit() {
    this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  }

}
