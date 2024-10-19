import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReviewsService } from '../services/reviews.service';
import { Reviews } from '../interfaces/reviews';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  subscription: any;
  reviews: Reviews[] = [];
  pagination: Pagination = {};
  page: number = 1;
  productImage: string = '';
  constructor(private _AuthService: AuthService, private _ReviewsService: ReviewsService) { }

  loadReviews() {
    this.subscription = this._ReviewsService.getReviews(50, this.page).subscribe({
      next: (res) => {
        this.reviews = res.data;
        this.pagination = res.pagination;
        console.log(this.reviews);
      },
      error: (err) => { }
    })
  }

  deleteReview(reviewId: string) {
    this._ReviewsService.deleteReview(reviewId).subscribe({
      next: (res) => {
        this.loadReviews();
        alert('review deleted');
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadReviews();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._ReviewsService.productImage;
    this.loadReviews();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
