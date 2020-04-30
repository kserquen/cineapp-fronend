import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { ClienteService } from './../../_service/cliente.service';
import { Cliente } from './../../_model/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns = ['idCliente', 'nombres', 'apellidos', 'fechaNac', 'dni', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private clienteService: ClienteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.clienteService.clienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(cliente?: Cliente) {
    let com = cliente != null ? cliente : new Cliente();
    this.dialog.open(ClienteDialogoComponent, {
      width: '250px',
      data: com
    });
  }

  eliminar(genero: Cliente) {
    this.clienteService.eliminar(genero.idCliente).subscribe(data => {
      this.clienteService.listar().subscribe(medicos => {
        this.clienteService.clienteCambio.next(medicos);
        this.clienteService.mensajeCambio.next("Se elimino");
      });
    });
  }

}
