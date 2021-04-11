import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-created',
  templateUrl: './post-created.component.html',
  styleUrls: ['./post-created.component.scss'],
  host: { class: 'container d-block' },
})
export class PostCreatedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
