import { Component, OnInit } from '@angular/core';
import { FishDataService } from '../fish-data.service';

export class Fish {
  _id!: String;
  name!: String;
  family!: String;
  food!: String;
  distribution: Distribution[] = [];
}
export class Distribution {
  d_name!: String;
}
@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css'],
})
export class FishesComponent implements OnInit {
  fishes!: Fish[];
  constructor(private fd: FishDataService) {}

  ngOnInit(): void {
    this.getFishes();
  }

  getFishes() {
    this.fd.getFishes().subscribe({
      next: (fishes) => {
        this.fishes = fishes;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('fishes fetch completed');
      },
    });
  }

  deleteFish(fishId: String) {
    this.fd.deleteFish(fishId).subscribe({
      next: (result) => {
        console.log(result);
        this.getFishes();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('fishes fetch completed');
      },
    });
  }
}
