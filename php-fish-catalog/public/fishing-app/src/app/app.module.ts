import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FishesComponent } from './fishes/fishes.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { EditFishComponent } from './edit-fish/edit-fish.component';
import { AddFishComponent } from './add-fish/add-fish.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { JwtInterceptor } from './utils/JwtInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FishesComponent,
    NavComponent,
    FooterComponent,
    EditFishComponent,
    AddFishComponent,
    ErrorPageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'fish/:fishId',
        component: EditFishComponent,
      },
      {
        path: 'addFish',
        component: AddFishComponent,
      },
      {
        path: 'fishes',
        component: FishesComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
      },
    ]),
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
