import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '@angular/router';
import { repeat } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  myForm: FormGroup;

  @Output() whenSubmit = new EventEmitter;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/)
      ]],
      address: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      password: ['', [
        Validators.required,
      ]],
      repeatPass: ['', [
        Validators.required
      ]]
    })
  }

  get firstName() {
    return this.myForm.get('firstName')
  }

  get lastName() {
    return this.myForm.get('lastName')
  }

  get address() {
    return this.myForm.get('address')
  }

  get email() {
    return this.myForm.get('email')
  }

  get password() {
    return this.myForm.get('password')
  }

  get repeatPass() {
    return this.myForm.get('repeatPass')
  }

  onSubmit() {
    this.whenSubmit.emit(this.myForm.value);
  }

  onPWChange() {
    if (this.password?.value == this.repeatPass?.value) {
      Swal.fire('Success!', 'You may now log-in!', 'success')
    } else {
      Swal.fire('Yikes!', 'Your passwords do not match! Please try again.', 'error')
    }
  }

}
