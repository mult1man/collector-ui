import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.less']
})
export class BookSearchComponent implements OnInit {

  validateForm: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];

  sortName: string | null = null;
  sortValue: string | null = null;
  listOfData: Array<{ name: string; year: number; publisher: string; [key: string]: string | number }> = [
    {
      name: 'Suske & Wiske',
      year: 1999,
      publisher: 'Willy Vandersteen'
    },
    {
      name: 'De Rode Ridder',
      year: 1984,
      publisher: 'Wily Vandersteen'
    },
    {
      name: 'Jommeke',
      year: 2001,
      publisher: 'Uitgever Jommeke'
    },
    {
      name: 'Urbanus',
      year: 1989,
      publisher: 'Hottentottententententoonstelling'
    }
  ];
  // You need to change it as well!
  listOfDisplayData: Array<{ name: string; year: number; publisher: string; [key: string]: string | number }> = [];

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 3; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
    this.search();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    const data = this.listOfData;
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          // tslint:disable-next-line:no-non-null-assertion
          ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
          // tslint:disable-next-line:no-non-null-assertion
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.listOfDisplayData = data;
    }
  }

}
