import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../interfaces/products';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  product: Products = {};
  imgDomain: string = '';
  id: string = '';
  reviewError: string = '';
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  constructor(private _ProductsService: ProductsService, private _ReviewsService: ReviewsService,
    private _ActivatedRoute: ActivatedRoute) { }

  loadProduct(productId: string) {
    this.subscription = this._ProductsService.getProduct(productId).subscribe({
      next: (res) => { this.product = res.data },
      error: (err) => { },
    })
  }

  addReview(productId: string, formData: FormGroup) {
    this._ReviewsService.addReview(productId, formData.value).subscribe({
      next: (res) => {
        this.loadProduct(this.id);
        alert('Review Added');
      },
      error: (err) => {
        if (err.error.errors) {
          this.reviewError = err.error.errors[0].msg;
        } else {
          this.reviewError = 'login first to add review';
        }
      }
    })
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this._ProductsService.productImages;
    this.loadProduct(this.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
