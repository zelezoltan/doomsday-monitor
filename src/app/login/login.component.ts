import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { STREAM_URL } from '../app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pressed = false;
  message = "Face ID required to enter!";
  success = true;
  img_url = "https://cdn.dribbble.com/users/2260998/screenshots/4891086/vault-logo.png"
  stream_url: string;
  current_url: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.stream_url = STREAM_URL;
    this.current_url = this.img_url;
  }

  login() {
    this.pressed = true;
    this.message = "Please look into the camera!";
    this.current_url = this.stream_url;
    // Connect with pi for face recognition
    // setTimeout(() => {
    //   this.message = "Access Denied!";
    //   this.pressed = false;
    //   this.success = false;
    // }, 5000)

    this.authService.login().subscribe(
      (res: any) => {
        console.log(res);
        setTimeout(()=>{
          this.router.navigateByUrl('/');
        }, 5000);
       
      },
      (err: any) => {
        console.log(err.error);
        this.message = err.error.message;
        this.pressed = false;
        this.success = false;
      }
    );
  }

}
