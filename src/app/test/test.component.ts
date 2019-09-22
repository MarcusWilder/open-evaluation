import { Component } from '@angular/core';
import { ToastService } from '@src/app/services/toast/toast.service';
import { Button } from '@src/app/types/button-group-types';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private toastService: ToastService) {}

  buttons: Button[] = [
    { type: 'destructive', content: 'Discard', onClick: () => alert('Discarded!') },
    { type: 'brand', content: 'Save' , onClick: () => alert('Saved!') },
    { type: 'success', content: 'Submit' }
  ];
  tabs = ['Home', 'Features', 'Resources'];
  activeTab: string;
  firstName: string;
  lastName: string;
  rankings = [1, 2, 3, 4, 5];
  selection: unknown;

  submit() {
    this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  }

}
