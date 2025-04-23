import { TestBed } from '@angular/core/testing';

import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get empty page 0 (not supported, should start from 1)', () => {
    service.getItems(0, 10).subscribe((data) => {
      expect(data).toEqual({ data: [], total: 10 });
    });
  });

  it('should get 5 items on page 1', () => {
    service.getItems(1, 10).subscribe((page) => {
      let data = page.data;
      let size = data.length;
      expect(size).toEqual(5);
    });
  });

  it('should add item', () => {
    let person = {
      name: 'John Doe',
      age: 25,
      city: 'New York'
    }
    service.addItem(person).subscribe((result) => {
      expect(result).toEqual(person);
    });
  });
});
