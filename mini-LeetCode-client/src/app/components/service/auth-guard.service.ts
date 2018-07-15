import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(@Inject("AuthService") private AuthService,
  private router: Router) { }

  canActivate(): boolean {
    if (this.AuthService.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(["/training-problem-list"]);
      return false;
    }
  }
}
