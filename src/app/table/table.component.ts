import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilterPipe } from "./filter.pipe";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, CommonModule, FilterPipe, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  items = [];
  displayedColumns: string[] = ['name', 'age', 'city'];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  selectedItem: any = null;
  filterValue: string = '';

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;

  ngOnInit(): void {
    this.getItems();
    const storedData = localStorage.getItem('storedData');
    if (storedData) {
      const parsedData = JSON.parse(storedData) as StoredData;
      if (parsedData.date && new Date(parsedData.date).getTime() > new Date('2026-04-10').getTime()) {
        localStorage.removeItem('storedData');
      } else {
        this.router.navigate(['/details', parsedData.selectedName]);
      }
    }
  }
  constructor(private tableService: TableService, private router: Router) {}
  getItems(): void {
    this.tableService.getItems(this.pageIndex + 1, this.pageSize)
      .subscribe((response) => {
        this.items = response.data;
        this.totalItems = response.total;
      });
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getItems();
    localStorage.removeItem('storedData');
  }
  goToDetails(row: any) {
    localStorage.setItem('storedData', JSON.stringify(
      {  
        selectedName: row.name, 
        date: new Date().toString() 
      } as StoredData));
    this.router.navigate(['/details', row.name]);
  }
}

export interface Person {
  name: string;
  age: number;
  city: string;
}

export interface StoredData {
  selectedName: string;
  date: string;
}