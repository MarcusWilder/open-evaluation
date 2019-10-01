import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '@src/app/services/toast/toast.service';
import { Survey } from '@src/app/objects/survey';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  activeTab: string;
  buttons = [
    {type: 'destructive', content: 'Discard' },
    {type: 'brand', content: 'Save' },
    {type: 'success', content: 'Submit' }
  ];
  coursePaceOptions = ['too slow', 'about right', 'too fast'];
  firstName: string;
  lastName: string;
  mcSelection: unknown;
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

  ngOnInit() {
    this.http.get<Survey[]>('api/surveys').subscribe({
      next(surveys) {
        console.log('%c THIS IS MOCK DATA: ', `
          font-weight: bold;
          font-size: 24px;
          background: black;
          color: white;
        `, surveys);
        console.log(JSON.stringify(surveys, undefined, 2));
      }
    })
  }

  submit() {
    this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  }

}
