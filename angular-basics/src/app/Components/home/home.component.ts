import { Component } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { CardMoviesComponent } from "../card-movies/card-movies.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, CardMoviesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sizepage =20;
}
