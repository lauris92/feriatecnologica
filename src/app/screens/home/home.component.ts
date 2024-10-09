import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/common/header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public transition = false;

  constructor(private router: Router) {}

  goToLink(route: string) {
    this.transition = !this.transition;
    setTimeout(() => {
      this.router.navigate([route]);
    }, 1200);
  }
}
