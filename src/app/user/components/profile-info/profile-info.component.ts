import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@shared/models/user';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  host: { class: 'col-md-4' }
})
export class ProfileInfoComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
