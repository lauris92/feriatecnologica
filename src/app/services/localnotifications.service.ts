import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor() {}


    openToast(message: string) {
        Toastify({
            text: message,
            duration: 6000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(212,237,252,1) 100%)",
              color: "black",
              marginTop: "1rem"
            },
          }).showToast();
      }
}