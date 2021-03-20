import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetaService } from 'app/blog/services/meta/meta.service';
import { ShippingService } from 'app/blog/services/shipping/shipping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { 'class': 'col-lg-8' },
})
export class ContactComponent implements OnInit {
  mail: FormGroup;
  submitted: boolean;
  mailSent: boolean;

  constructor(
    private _meta: MetaService,
    private _shipping: ShippingService,
  ) {
    this.mail = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required])
    });
    this.submitted = false;
  }

  ngOnInit(): void {
    this._meta.updateTitle('Contact');
  }

  onMailSubmit(): void {
    this.submitted = true;
    if (this.mail.valid) {
      this._shipping.sendMail(this.mail.getRawValue())
        .subscribe(res => {
          this.mail.reset();
        }, () => Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'El correo ha fallado en enviarse',
          showClass: {
            popup: 'animate__animated animate__fadeInUp',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown',
          },
          showConfirmButton: false,
          timer: 2000,
        }));
    }
  }
}
