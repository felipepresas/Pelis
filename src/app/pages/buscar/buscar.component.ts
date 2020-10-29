import { Movie } from './../../interfaces/cartelera-response';
import { PeliculasService } from './../../service/peliculas.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  buscarMovie: Movie[] = [];
  public texto:string ='';

  constructor(private activateRoute: ActivatedRoute,
    private pelisService: PeliculasService) { }

  ngOnInit(): void {


    this.activateRoute.params.subscribe(params => {

      this.texto = params.texto;

      this.pelisService.buscarPeliculas(params.texto).subscribe(movies => {
        this.buscarMovie = movies;
      });
    });
  }

}
