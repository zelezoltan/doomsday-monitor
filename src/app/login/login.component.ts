import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pressed = false;
  message = "Face ID required to enter!";
  success = true;

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.pressed = true;
    this.message = "Please look into the camera!";

    // Connect with pi for face recognition
    setTimeout(() => {
      this.message = "Access Denied!";
      this.pressed = false;
      this.success = false;
    }, 5000)
  }

}
