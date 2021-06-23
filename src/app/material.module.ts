import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import{MatSidenavModule} from '@angular/material/sidenav';
import{MatButtonModule} from '@angular/material/button';
import{MatNativeDateModule} from '@angular/material/core';
import{MatIconModule} from '@angular/material/icon';
import{MatCheckboxModule} from '@angular/material/checkbox';
import{MatSelectModule} from '@angular/material/select';
import{MatListModule} from '@angular/material/list';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatInputModule} from '@angular/material/input';
import{MatCardModule} from '@angular/material/card';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatTabsModule} from '@angular/material/tabs';
import{MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatInputModule,
    MatNativeDateModule, MatIconModule, MatCheckboxModule, MatSelectModule,
    MatSidenavModule, MatListModule, MatTableModule, MatTabsModule, MatPaginatorModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule],

  exports: [CommonModule, MatButtonModule, MatToolbarModule, MatInputModule,
    MatNativeDateModule, MatIconModule, MatCheckboxModule, MatSelectModule,
    MatSidenavModule, MatListModule, MatTableModule, MatTabsModule, MatPaginatorModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule],
})
export class CustomMaterialModule { }