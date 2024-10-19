import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'signup', title: 'Signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'login', title: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
  {
    path: 'products',
    children: [
      { path: '', title: 'Products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
      { path: ':id', title: 'Product Details', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    ]
  },
  { path: 'myReviews', title: 'Reviews', loadComponent: () => import('./reviews/reviews.component').then(m => m.ReviewsComponent) },
  { path: '**', title: '404 Not Found', component: NotFoundComponent },

];
