import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  
  currentUrl;
  messageClass;
  message;
  username;
  email;
  foundProfile = false;
  
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getPublicProfile(this.currentUrl.username).subscribe(profile =>{
      if(!profile.success){
        this.messageClass = 'alert alert-danger';
        this.message = profile.message;
      }else{
        this.username = profile.user.username;
        this.email = profile.user.email;
        this.foundProfile = true;
      }
    })
  }

}
