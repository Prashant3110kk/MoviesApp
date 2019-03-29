import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieServiceService } from "../movie-service.service";
import { MovieModel } from "../movie.model";

@Component({
  selector: "app-movieview",
  templateUrl: "./movieview.component.html",
  styleUrls: ["./movieview.component.scss"]
})
export class MovieviewComponent implements OnInit {
  id: string;
  public apiCall = true;
  public redirect = false;
  public movie = new MovieModel();
  private sub: any;

  constructor(private route: ActivatedRoute, public movieService: MovieServiceService, public router: Router) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id) {
        this.redirect = false;
      } else {
        this.router.navigate(["/movies"]);
      }
    });
  }

  ngOnInit() {
    this.movieService.getMovieDetails(this.id).subscribe((res: any) => {
      this.movie = res;
      this.apiCall = false;
    }, error => {
      console.log(error);
    });
  }

  backMovie() {
    this.router.navigate(["/movies"]);
  }
}
