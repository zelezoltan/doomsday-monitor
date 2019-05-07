import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { STREAM_URL } from '../app-config';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';

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

  streamSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.stream_url = STREAM_URL;
    this.current_url = this.img_url;
    // this.db.list('startstream').push({
    //   date: Math.floor((new Date()).getTime()/1000)
    // });
    // this.db.list('endstream', ref => ref.limitToLast(1)).valueChanges().subscribe(data => {
    //   if (data.length > 0) {
    //     console.log(data);
    //     const date: any = data[0];
    //     console.log(Math.floor((new Date()).getTime()/1000)-JSON.parse(date).date);
    //   }
      
    // })
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
    console.log("sending startstream");
    this.db.list('startstream').push({
      date: Math.floor((new Date()).getTime()/1000)
    });

    this.streamSubscription = this.db.list('endstream', ref => ref.limitToLast(1)).valueChanges().subscribe(data => {
      if (data.length > 0) {
        
        const date: any = data[0];
        console.log(Math.floor((new Date()).getTime()/1000)-JSON.parse(date).date);
        if(Math.floor((new Date()).getTime()/1000) - JSON.parse(date).date < 2) {
          console.log("received endstream");
          this.streamSubscription.unsubscribe();
          this.authService.login().subscribe(
            (res: any) => {
              console.log(res);
              // setTimeout(()=>{
                this.router.navigateByUrl('/');
              // }, 5000);
             
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
    });

    // this.authService.login().subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     // setTimeout(()=>{
    //       this.router.navigateByUrl('/');
    //     // }, 5000);
       
    //   },
    //   (err: any) => {
    //     console.log(err.error);
    //     this.message = err.error.message;
    //     this.pressed = false;
    //     this.success = false;
    //   }
    // );
  }

}
