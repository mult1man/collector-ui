import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'page-forbidden',
  templateUrl: 'page-forbidden.component.html'
})
export class PageForbiddenComponent implements OnInit {

  constructor(private router: Router,
              private titleService: Title) {
  }

  ngOnInit(): any {
    this.titleService.setTitle('Error 403');
  }

  home() {
    this.router.navigate(['/home']);
  }

}
