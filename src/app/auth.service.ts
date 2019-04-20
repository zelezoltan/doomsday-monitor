import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BACKEND_URL } from './app-config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router, public snackBar: MatSnackBar) { }

  public login(): Observable<any> {
    return this.httpClient.get<any>(`${BACKEND_URL}/login`).pipe(
      tap((res:any) => {
        localStorage.setItem('monitor-access', 'true');
        this.snackBar.open(`Hello ${res.name}!`, 'OK', {
          duration: 3000
        });
      })
    );
  }

  public isLoggedIn(): boolean {
    const token: string = localStorage.getItem('monitor-access');
    if (token) {
      return token == 'true' ? true : false;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem('monitor-access');
    this.router.navigateByUrl('/login');
    this.snackBar.open('Successfully logged out!', 'OK', {
      duration: 3000
    });
  }
}
