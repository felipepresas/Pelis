import { Moviedeteil, Cast } from './../../interfaces/cartelera-response';
import { PeliculasService } from './../../service/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: Moviedeteil;
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([

      this.peliculasService.getpeliculasdetalles(id),
      this.peliculasService.getCredit(id)

    ]).subscribe(([pelicula, cast]) => {

      if (!pelicula) {
        this.router.navigateByUrl('home');
        return;
      }

      this.movie = pelicula;
      this.cast = cast.filter(actor => actor.profile_path != null);


    });


    // this.peliculasService.getpeliculasdetalles(id)
    //   .subscribe(movie => {
    //     if (!movie) {
    //       this.router.navigateByUrl('home');
    //       return;
    //     }
    //     this.movie = movie;
    //   });

    // this.peliculasService.getCredit(id)
    //   .subscribe(cast => {
    //     console.log(cast);
    //     this.cast = cast.filter(actor => actor.profile_path != null);
    //   });
  }
  onRegresar() {
    this.location.back();
  }
}
