import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AddFishComponent } from './fish/add-fish/add-fish.component';
import { ErrorPageComponent } from './main/error-page/error-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { JwtInterceptor } from './utils/JwtInterceptor';
import { EditFishComponent } from './fish/edit-fish/edit-fish.component';
import { FishesComponent } from './fish/fishes/fishes.component';
import { ProfileComponent } from './user/profile/profile.component';
import { FooterComponent } from './main/footer/footer.component';
import { HomeComponent } from './main/home/home.component';
import { NavComponent } from './main/nav/nav.component';
import { environment } from 'src/environments/environment';

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
        path: environment.PATH_HOME,
        component: HomeComponent,
      },
      {
        path: environment.PATH_EDIT_FISH,
        component: EditFishComponent,
      },
      {
        path: environment.PATH_ADD_FISH,
        component: AddFishComponent,
      },
      {
        path: environment.PATH_FISHS,
        component: FishesComponent,
      },
      {
        path: environment.PATH_REGISTER,
        component: RegisterComponent,
      },
      {
        path: environment.PATH_PROFILE,
        component: ProfileComponent,
      },
      {
        path: environment.PATH_ERROR,
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
