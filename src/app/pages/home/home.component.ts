import {Component, OnInit} from '@angular/core';
import {UserContext} from '../user/model/user-context.model';
import {UserContextHolder} from '../user/model/user-context.holder';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

   userContext: UserContext;

  constructor(private userContextHolder: UserContextHolder) {
  }

  ngOnInit() {
    this.userContext = this.userContextHolder.get();
  }

}
