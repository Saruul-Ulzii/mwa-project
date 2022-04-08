import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    GamesComponent,
    GameComponent,
    ErrorPageComponent,
    StarsRatingComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'game/:gameId',
        component: GameComponent,
      },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
