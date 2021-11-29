import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticated = false;
  title = 'Education Center';
  cash1 = 420;
  cash2 = 500;
  cash3 = 60;
  date = new Date();

  constructor() { }

  ngOnInit(): void {
  }



}
