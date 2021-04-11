import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  host: { class: 'col-md-4' }
})
export class ProfileInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
