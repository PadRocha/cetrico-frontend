import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/services/auth/auth.service';
import { UserService } from 'app/auth/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  userForm: FormGroup;
  userSubmitted: boolean;
  passwordVisibility: boolean;
  private expiry: boolean;
  @ViewChild('pass') pass: ElementRef<HTMLInputElement>

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _user: UserService,
  ) {
    this.userForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.userSubmitted = false;
    this.passwordVisibility = false;
    this.expiry = true;
  }

  ngOnInit(): void {
  }

  showPass(): void {
    this.pass.nativeElement.type = 'text';
    this.passwordVisibility = true;
  }

  hidePass(): void {
    this.pass.nativeElement.type = 'password';
    this.passwordVisibility = false;
  }

  onCheckboxChange(): void {
    this.expiry = !this.expiry;
  }

  onUserSubmit(): void {
    this.userSubmitted = true;
    if (this.userForm.valid) {
      this._auth.loginUser(this.userForm.getRawValue())
        .subscribe(({ token }) => {
          this._auth.setToken(token, this.expiry);
          this.userForm.reset();
          this.userSubmitted = false;
          this._user.update();
          this._router.navigate(['/blog/home']);
        }, () => Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Usuario incorrecto',
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
