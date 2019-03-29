import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieviewComponent } from './movieview/movieview.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieviewComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full'},
  { path: '**', redirectTo: 'movies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
