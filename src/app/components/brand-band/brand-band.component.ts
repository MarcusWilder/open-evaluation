import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-brand-band',
  templateUrl: './brand-band.component.html',
  styleUrls: ['./brand-band.component.css']
})
export class BrandBandComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'green';
  }

}
