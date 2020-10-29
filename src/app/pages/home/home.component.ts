import { Movie } from './../../interfaces/cartelera-response';
import { PeliculasService } from './../../service/peliculas.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fail } from 'assert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onscroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {

      if (this.peliculasService.cargando) {return;}


      this.peliculasService.getCartelera().subscribe(resp => {
        this.movies.push(...resp);

      });
    }

  }


  constructor(
    private peliculasService: PeliculasService
  ) {

  }
  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }

  ngOnInit(): void {
    this.peliculasService.getCartelera()
      .subscribe(resp => {
        // console.log(resp.results);
        this.movies = resp.filter(movie => movie.poster_path != null || movie.backdrop_path !=null);
        this.moviesSlideShow = resp.filter(movie => movie.poster_path != null);
      });
  }
}
