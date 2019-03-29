import { MovieServiceService } from './../movie-service.service';
import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movieList: Array<MovieModel>;
  public apiCall = true;
  constructor(
    public movieService: MovieServiceService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe((res: any) => {
      this.movieList = <MovieModel[]>res;
      this.apiCall = false;
    }, error => {
      this.apiCall = false;
      console.log(error);
    });
  }
  viewMovie(movie) {
    this.router.navigate(['/movie/' + movie._id]);
  }
}
