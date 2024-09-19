import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streamada-overview',
  standalone: true,
  imports: [],
  templateUrl: './streamada-overview.component.html',
  styleUrl: './streamada-overview.component.scss'
})
export class StreamadaOverviewComponent {

  constructor(private router: Router){}

  logoutUser(){
    this.router.navigate(['landingpage']);
  }
}
