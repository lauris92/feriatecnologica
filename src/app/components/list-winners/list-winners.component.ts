import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-winners',
  standalone: true,
  imports: [],
  templateUrl: './list-winners.component.html',
  styleUrl: './list-winners.component.scss',
})
export class ListWinnersComponent implements OnInit {
  public employes: Array<any> | undefined = [];

  ngOnInit(): void {
    if (localStorage.getItem('winners') != null) {
      this.employes = JSON.parse(localStorage.getItem('winners')!);
    }
  }

  cleanStorage() {
    this.employes = [];
    localStorage.clear();
  }
}
