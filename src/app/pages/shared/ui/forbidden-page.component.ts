import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'forbidden-page',
  templateUrl: 'forbidden-page.component.html',
})
export class ForbiddenPageComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit(): any {
    this.titleService.setTitle('Error 403');
  }

  logout() {
  }

}
