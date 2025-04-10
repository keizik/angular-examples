import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
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

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;

  ngOnInit(): void {
    this.getItems();
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
  }
  goToDetails(row: any) {
    this.router.navigate(['/details', row.name]);
  }
}

export interface Person {
  name: string;
  age: number;
  city: string;
}
