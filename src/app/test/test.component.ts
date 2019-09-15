import { Component } from '@angular/core';
import { ToastService } from '@src/app/services/toast/toast.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private toastService: ToastService) {}

  buttons = [
    {type: 'destructive', content: 'Discard' },
    {type: 'brand', content: 'Save' },
    {type: 'success', content: 'Submit' }
  ];
  tabs = ['Home', 'Features', 'Resources'];
  activeTab: string;
  firstName: string;
  lastName: string;
  rankings = [1, 2, 3, 4, 5];
  coursePaceOptions = ['too slow', 'about right', 'too fast'];
  selection: unknown;
  mcSelection: unknown;

  submit() {
    this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  }

}
