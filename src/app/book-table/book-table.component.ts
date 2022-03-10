import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../book';

let bookList: Book[] = [
  {
    id: 0,
    name: 'Makan',
    owner: 'Elizabeth Haigh',
    available: true,
  },
  {
    id: 1,
    name: 'testBook1',
    owner: 'not me',
    available: false,
  },
  {
    id: 2,
    name: 'testBook2',
    owner: 'dev2',
    available: true,
  },
  {
    id: 3,
    name: 'testBook3',
    owner: 'nobody',
    available: false,
  },
  {
    id: 4,
    name: 'testBook4',
    owner: 'me',
    available: true,
  },
  {
    id: 5,
    name: 'Book name 5',
    owner: 'Developer #5',
    available: true,
  },
];

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
})
export class BookTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'owner', 'available', 'actions'];
  dataSource: MatTableDataSource<Book>;

  /*
  In order to test the Paginator, I would provide a mock bookList of 201 books, that will allow me to test the first and second page for each page size as well as a length of 1 for the last page in each page size
*/
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = this.dataSource = new MatTableDataSource(bookList);
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /*
  In order to test the filter, I would provide a mock bookList and a string to search, then check the number of results for a search term that should provide 2 or more results.
  Additionally check the data in each column for a search term that has 1 matching row.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
  In order to test the checkout and checkin functions, I would test the value of available after running each function with a given id
  */
  checkout(bookId: number) {
    for (let book of bookList) {
      if (book.id === bookId ){
        book.available = false
      }
    }
  }

  checkin(bookId: number) {
    for (let book of bookList) {
      if (book.id === bookId ){
        book.available = true
      }
    }
  }


}
