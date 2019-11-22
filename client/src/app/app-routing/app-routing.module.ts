import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';  
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';

const appRoutes : Routes =[
  {path: '',component: HomeComponent},
  {path: 'dashboard',component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: '**',component: HomeComponent}
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
