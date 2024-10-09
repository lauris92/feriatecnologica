import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  urlImg: string;
}

@Component({
  selector: 'app-modal-documents',
  standalone: true,
  imports: [ 
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ZXingScannerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './modal-qr.component.html',
  styleUrl: './modal-qr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalQrComponent {
  public qrResultString: string = '';
  readonly dialogRef = inject(MatDialogRef<ModalQrComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly readqrstring = model(this.qrResultString);


  onNoClick(): void {
    this.dialogRef.close(this.qrResultString);
  }

  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log('Resultado del QR: ', resultString);
    this.onNoClick();
  }
}
