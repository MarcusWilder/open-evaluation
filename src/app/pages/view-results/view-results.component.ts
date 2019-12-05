import { Component, OnInit } from '@angular/core';
import { Survey, SurveyResults } from '@src/app/types/survey';
import { Route, ActivationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SurveyService } from '@src/app/services/survey/survey.service';
import * as d3 from "d3";
import { QuestionWithResponses } from '@src/app/types/question';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) { }

  surveyResults: SurveyResults = null;   // `surveyData` willed be passed into `SurveyTemplateComponent` and answers will be appended in place
  dataLoaded = false;
  courseId: number;
  surveyId: string;

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.courseId = +params.get('courseId')
        this.surveyId = params.get('surveyId')        
        return this.surveyService.getSurveyResultsById(this.courseId, this.surveyId);
      })
    ).subscribe(results => {
      this.surveyResults = results;
      console.log(results);
      this.dataLoaded = true;
      this.surveyResults.questions.forEach((q, i) => {
        if (q.type === 'FREE_RESPONSE') return;
        const promise = new Promise((resolve) => {
          const interval = window.setInterval(() => {
            let el = document.querySelector('#chart-' + i);
            if (el) {
              window.clearInterval(interval);
              resolve(el);
            }
          }, 100);
        });
        promise.then((el: HTMLElement) => this.drawChart(q, i, el));
      });
    });
  }


  drawChart(q: QuestionWithResponses, i, el: HTMLElement) {
    const margin = { top: 10, bottom: 10, left: 50, right: 50 };
    const width = el.clientWidth - margin.left - margin.right;
    const height = el.clientHeight - margin.top - margin.right;
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.6);
    var y = d3.scaleLinear()
              .range([height, 0]);
    var svg = d3.select('#chart-' + i)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const maxCount = Math.max(...(q.responses as number[]));
    const options = q.options || [0, 1, 2, 3, 4, 5];
    x.domain(options);
    y.domain([0, maxCount]);
    svg.selectAll(".bar")
        .data(q.responses)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(_, i) { return x(options[i]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); })
        .attr('fill', '#4285F4');

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(maxCount, 'd'));

  }

}
