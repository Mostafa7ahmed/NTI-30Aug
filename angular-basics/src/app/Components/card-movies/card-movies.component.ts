import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card-movies',
  standalone: true,
  imports: [],
  templateUrl: './card-movies.component.html',
  styleUrl: './card-movies.component.scss'
})
export class CardMoviesComponent {
 

  @Input() sizepage:number =10;

  


}
