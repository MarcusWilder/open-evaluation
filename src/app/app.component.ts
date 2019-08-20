import { Component } from '@angular/core';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastService: ToastService) {}

  buttons = [
    {type: 'destructive', content: 'Discard' },
    {type: 'brand', content: 'Save' },
    {type: 'success', content: 'Submit' }
  ];
  firstName: string;
  lastName: string;
  rankings = [1, 2, 3, 4, 5];
  selection: unknown;

  submit() {
    this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  }
}
