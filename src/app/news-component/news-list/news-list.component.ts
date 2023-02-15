import { SingleNews } from './../../model/singleNews';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NewsService } from '../service/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NewsEditDialogComponent } from '../dialogs/edit-dialog/news-edit-dialog/news-edit-dialog.component';
import { NewsAddDialogComponent } from '../dialogs/add-dialog/news-add-dialog/news-add-dialog.component';
import { NewsViewDialogComponent } from '../dialogs/news-view-dialog/news-view-dialog.component';

export interface VideogameShort {
  title: string;
  coverImage: string;
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  displayedColumns: string[] = [
    'imageUrl',
    'title',
    'publicationDate',
    'authorName',
    'actions',
  ];
  dataSource = new MatTableDataSource<SingleNews>();
  numberOfNews = 0;

  innerWidth: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private newsService: NewsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.changeVisibileColumns();

    this.getAllNews();
  }

  //Funzione per recuperare i dati e inserirli nella tabella
  getAllNews() {
    this.newsService.getNews().subscribe({
      next: (news) => {
        this.dataSource = new MatTableDataSource(news.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('There was a problem  retrieving the data');
      },
    });
  }

  lastSingleNewsDeleted = '';
  //funzione per eliminazione di un singleNews
  onClickDeleteSingleNews(id: string, title: string) {
    this.newsService.deleteNewsById(id).subscribe(() => {
      this.getAllNews();
    });

    this.lastSingleNewsDeleted = title;
  }

  //funzione filter della tabella
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Listener che tiene traccia delle dimensioni dello schermo in seguito a un window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    this.innerWidth = event.target.innerWidth;
    this.changeVisibileColumns();
  }

  //Funzione per nascondere colonne in base alle dimensioni dello schermo
  changeVisibileColumns() {
    if (this.innerWidth > 750) {
      this.displayedColumns = [
        'imageUrl',
        'title',
        'publicationDate',
        'authorName',
        'actions',
      ];
    } else {
      this.displayedColumns = [
        'title',
        'publicationDate',
        'authorName',
        'actions',
      ];
    }
  }

  //Funzione per la creazione dello snackbar, utilizzato in segutio all'eliminazione di un elemento
  openSnackBar() {
    this._snackBar.open(this.lastSingleNewsDeleted + ' Deleted', 'Close', {
      duration: 3200,
      panelClass: ['delete-snackbar'],
    });
  }

  //Apertura edit-dialog
  openDialog(row: any) {
    this.dialog
      .open(NewsEditDialogComponent, {
        panelClass: 'news-dialog',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'edit') {
          this.getAllNews();
        }
      });
  }

  addDialog() {
    this.dialog
      .open(NewsAddDialogComponent, {
        panelClass: 'news-dialog',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllNews();
        }
      });
  }

  viewDialog(news: SingleNews) {
    this.dialog.open(NewsViewDialogComponent, {
      panelClass: 'view-news-dialog',
      data: news,
    });
  }
}
