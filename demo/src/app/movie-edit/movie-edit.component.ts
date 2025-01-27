import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
 selector: 'app-movie-edit',
 templateUrl: './movie-edit.component.html',
 styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
 movieForm: FormGroup;
 movieId: number | undefined;
 constructor(
 private fb: FormBuilder,
 private movieService: MovieService,
 private route: ActivatedRoute,
 private router: Router
 ) {
 this.movieForm = this.fb.group({
 title: ['', Validators.required],
 director: ['', Validators.required],
 year: [null, [Validators.required, Validators.min(1900), Validators.max(new 
Date().getFullYear())]]
 });
 }

ngOnInit(): void {
  this.movieId= +this.route.snapshot.paramMap.get('id')!;
  this.movieService.getMovie(this.movieId).subscribe(movie => {
    this.movieForm.patchValue(movie);
  })
  // this.movieService.getMovie(this.movieId).subscribe(movie => {
  //   this.movieForm.patchValue(movie)}
  // )
}

updateMovie() : void{
  if(this.movieForm.valid){
    this.movieService.updateMovie({...this.movieForm.value,id:this.movieId}).subscribe(() =>{
    this.router.navigate(['/']);
  });
}
}
}