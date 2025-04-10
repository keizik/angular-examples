import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';

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
  constructor(private tableService: TableService) {}
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
  alert(row: any) {
    this.selectedItem = row;
  }
}

export interface Person {
  name: string;
  age: number;
  city: string;
}
