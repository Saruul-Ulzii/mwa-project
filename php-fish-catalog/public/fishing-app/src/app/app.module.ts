import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FishesComponent } from './fishes/fishes.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { EditFishComponent } from './edit-fish/edit-fish.component';
import { AddFishComponent } from './add-fish/add-fish.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FishesComponent,
    NavComponent,
    FooterComponent,
    EditFishComponent,
    AddFishComponent,
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
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
