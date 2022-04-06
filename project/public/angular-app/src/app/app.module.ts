import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: "",
      component: HomeComponent
    },
  {
    path:"games", 
    component: GamesComponent
  }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
