import { Component, OnInit } from '@angular/core';
import { ToastService } from '@src/app/services/toast/toast.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private toastService: ToastService) {}

  ngOnInit() {
  }

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
