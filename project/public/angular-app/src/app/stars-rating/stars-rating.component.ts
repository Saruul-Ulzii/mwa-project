import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css'],
})
export class StarsRatingComponent implements OnInit {
  stars: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.stars = new Array(this.rating);
  // }

  @Input()
  set rating(rating: number) {
    this.stars = new Array(rating);
  }
}
