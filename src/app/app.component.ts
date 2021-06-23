import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CarroService } from './services/app.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  title = 'sicar-app';

  displayedColumns: string[] = ['placa','marca','modelo' ,'proprietario','email','telefone','dataFabricacao'];

  dataSource: any;

  isLoading = false;

  editPlaca = new FormControl();
  editProprietario = new FormControl();

  constructor(
    public carroService: CarroService,
    public changeDetectorRefs: ChangeDetectorRef,
  ) { }
  ngAfterViewInit(): void {
    this.search();
  }

  clearAndReload(){
    this.isLoading = true;
  }

  search(){
    this.clearAndReload();
    if((this.editPlaca.value === null || this.editPlaca.value === undefined || this.editPlaca.value  === '') &&
    (this.editProprietario.value === null || this.editProprietario.value === undefined || this.editProprietario.value === '')){
      this.carroService.getAll().subscribe(
          res => {
            console.log(res);
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.changeDetectorRefs.detectChanges();
          },
          err=>{
            console.log('[ERROR] Erro ao listar registros: ' + JSON.stringify(err));
            this.isLoading=false;
          }
        );
    }else if(this.editPlaca.value !== null && this.editPlaca.value !== undefined && this.editPlaca.value !== ''){
      this.carroService.getByPlaca(this.editPlaca.value).subscribe(
        res => {
          console.log(res);
          let arrayRes = [res];
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(arrayRes);
          this.dataSource.paginator = this.paginator;
          this.changeDetectorRefs.detectChanges();
        },
        err=>{
          console.log('[ERROR] Erro ao listar registros: ' + JSON.stringify(err));
          this.isLoading=false;
        }
      );
    }else{
      this.carroService.getByProprietario(this.editProprietario.value).subscribe(
        res => {
          console.log(res);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.changeDetectorRefs.detectChanges();
        },
        err=>{
          console.log('[ERROR] Erro ao listar registros: ' + JSON.stringify(err));
          this.isLoading=false;
        }
      );
    }

  }
}
