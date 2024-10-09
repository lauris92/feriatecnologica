import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firebaseService } from '../../services/firebase.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OwnerService } from '../../services/owners.service';

import {MatDialog} from '@angular/material/dialog';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { ModalQrComponent } from '../../components/modal-qr/modal-qr.component';

@Component({
  selector: 'app-read-qr',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './read-qr.component.html',
  styleUrl: './read-qr.component.scss'
})
export class ReadQRComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly readqrstring = signal('');
  public transition = false;
  public qrResultString: string = '';
  public markedOwners: string[] = [];
  public owners : any;

  constructor(private router: Router, private firebaseService: firebaseService, public _ownerService: OwnerService) {}

  ngOnInit(): void {
    this._ownerService.getOwner().subscribe(data => {
      this.owners = data;
    });
  }

  /* handleQrCodeResult(resultString: string) {
    console.log('Resultado del QR: ', resultString);
  } */

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalQrComponent, {
      data: {name: 'bryan'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.owners.some((owner:any) => owner.codeQR === result)) {
          if (!this.markedOwners.includes(result)) {
            this.markedOwners.push(result);
          }
        }
        console.log('QR leído:', result);
        this.qrResultString = result;
      }
    });
  }

  isOwnerMarked(ownerName: string): boolean {
    return this.markedOwners.includes(ownerName);
  }

  goToLink(route : string){
    this.transition = !this.transition;
    setTimeout(() => {
      this.router.navigate([route]);
    }, 1200);
  }

  sendAssistence(){
    if(this.markedOwners.length == 11){
      const CODIGO = localStorage.getItem('codigoempleado');

      if(CODIGO){
        this.firebaseService.sendEmployes(JSON.parse(CODIGO));
        setTimeout(() => {
          Toastify({
            text: "Su asistencia al evento fue validada con exito",
            duration: 6000,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "center",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(180deg, rgba(212,237,252,1)  0%, rgba(255,255,255,1) 100%)",
              color: "black",
              marginTop: "1rem"
            },
          }).showToast();
  
          this.goToLink('/home');
        }, 1000);
      }
    }else{
      Toastify({
        text: "Debe registrar su asistencia con todos los proveedores leyendo el QR para validar su asistencia",
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(180deg, rgba(212,237,252,1)  0%, rgba(255,255,255,1) 100%)",
          color: "black",
          marginTop: "1rem"
        },
      }).showToast();
    }
    
  }
}
