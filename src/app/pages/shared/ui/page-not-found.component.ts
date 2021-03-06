import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'page-not-found',
  templateUrl: 'page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router,
              private titleService: Title) {
  }

  ngOnInit(): any {
    this.titleService.setTitle('Error 404');
  }

  home() {
    this.router.navigate(['/home']);
  }

}
