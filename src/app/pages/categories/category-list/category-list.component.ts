import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  msg!: string;

  constructor() { }

  ngOnInit(): void {
  }

  alertMsg(): void {
      alert('Exluir');
  }

}
