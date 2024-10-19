import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { ProductsService } from '../services/products.service';
import { Products } from '../interfaces/products';
import { Pagination } from '../interfaces/pagination';
import { DescriptionPipe } from '../pipes/description.pipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BestSellerComponent } from "../best-seller/best-seller.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeroComponent, DescriptionPipe, CommonModule, RouterLink, BestSellerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: any;
  products: Products[] = [];
  imgDomain: string = '';
  pagination: Pagination = {};
  limit: number = 16;
  page: number = 1;
  sort: string = '-createdAt'
  search: string = '';
  constructor(private _ProductsService: ProductsService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(this.limit, this.page, this.sort, this.search)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.pagination = res.pagination;
        },
        error: (err) => { }
      })
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchProducts(search: string) {
    this.search = search;
    this.loadProducts();
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
