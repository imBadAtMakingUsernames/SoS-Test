import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Book } from '../book';

export interface DialogData {
  book:Book
}
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  book: Book;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialog, {
      width: '250px',
      data: { book: { name: '', owner: '' } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.book = result;
      console.log(this.book);
      //add book with available as true (assuming adding a book is essentially checking in a book that doesn't exist in the system)
    });
  }
}

/*
In order to test the dialog, I would check the object to ensure it has been created after pressing the Add Book button.
Additionally I would inject some data and close the dialogue with the close button to test to see if a book was added.
Similarly, I would inject some data and close the dialogue with the Add button to test to see if a book was added.
*/
@Component({
  selector: 'add-book-dialog',
  templateUrl: 'add-book-dialog.html',
})

export class AddBookDialog {
  constructor(
    public dialogRef: MatDialogRef<AddBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
