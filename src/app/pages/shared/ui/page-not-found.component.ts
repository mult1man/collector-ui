import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'page-not-found',
  templateUrl: 'page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit(): any {
    this.titleService.setTitle('Error 404');
  }

}
