import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/common/header/header.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firebaseService } from '../../services/firebase.service';

import 'toastify-js/src/toastify.css';
import { LocalNotificationsService } from '../../services/localnotifications.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  public transition = false;
  public employes: any;

  code: string = 'VP';
  vpnumber: number | null = null;

  constructor(
    private router: Router,
    private firebaseService: firebaseService,
    public _notifications: LocalNotificationsService
  ) {
    this.getEmpleados();
  }

  ngOnInit(): void {}

  getEmpleados() {
    this.firebaseService.getEmployes().subscribe(
      (employes) => {
        this.employes = employes;
        console.log(this.employes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveToLocalStorage() {
    if (this.vpnumber) {
      if (
        this.vpnumber.toString().length < 6 &&
        this.vpnumber.toString().length > 3
      ) {
        const codigoEmpleado = { codigoEmpleado: this.code + this.vpnumber };

        if (this.codeEmployeeExist(codigoEmpleado)) {
          this._notifications.openToast(
            'Su código de empleado ya se encuentra en nuestra base de datos con su asistencia confirmada'
          );
        } else {
          localStorage.setItem(
            'codigoempleado',
            JSON.stringify(codigoEmpleado)
          );
          this.goToLink('/readQR');
        }
      } else {
        this._notifications.openToast('Su código de empleado es incorrecto');
      }
    } else {
      this._notifications.openToast(
        'Debe escribir su código de empleado para poder ingresar'
      );
    }
  }

  codeEmployeeExist(code: any) {
    console.log(code);
    const existe = this.employes.some(
      (empleado: any) => empleado.codigoEmpleado == code.codigoEmpleado
    );
    return existe;
  }

  goToLink(route: string) {
    this.transition = !this.transition;
    setTimeout(() => {
      this.router.navigate([route]);
    }, 1200);
  }
}
