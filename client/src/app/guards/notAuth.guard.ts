import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
@Injectable()
export class NotAuthGuard implements CanActivate {

    constructor (
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService
    ) {}

    canActivate() {
        if(this.authService.loggedIn()) {
            this.flashMessage.show('You are already logged in',  {cssClass:'alert-info', timeout: 3000});
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        } 
    }
}
