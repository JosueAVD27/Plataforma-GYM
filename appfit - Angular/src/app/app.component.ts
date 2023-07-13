import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Velasquez Armando';

  isHidden: boolean = true;
  isActiveBtn1: boolean = true;
  isActiveBtn2: boolean = true;
  isActiveBtn3: boolean = true;
  isActiveBtn4: boolean = true;
  isActiveBtn5: boolean = true;

  constructor(private router:Router, private activatedRoute: ActivatedRoute){
    this.isHidden = false;
    this.isActiveBtn1 = true;
    this.isActiveBtn2 = false;
    this.isActiveBtn3 = false;
    this.isActiveBtn4 = false;
    this.isActiveBtn5 = false;
  }

  ngOnInit() {
    this.isHidden = this.router.url !== '';
  }

  Inicio(){
    this.isHidden = false;
    this.isActiveBtn1 = true;
    this.isActiveBtn2 = false;
    this.isActiveBtn3 = false;
    this.isActiveBtn4 = false;
    this.isActiveBtn5 = false;
    this.router.navigate(["/"]);
  }

  Cliente(){
    this.isHidden = true;
    this.isActiveBtn1 = false;
    this.isActiveBtn2 = true;
    this.isActiveBtn3 = false;
    this.isActiveBtn4 = false;
    this.isActiveBtn5 = false;
    this.router.navigate(["cliente"]);
  }

  Servicio(){
    this.isHidden = true;
    this.isActiveBtn1 = false;
    this.isActiveBtn2 = false;
    this.isActiveBtn3 = true;
    this.isActiveBtn4 = false;
    this.isActiveBtn5 = false;
    this.router.navigate(["servicio"]);
  }

  Rutina(){
    this.isHidden = true;
    this.isActiveBtn1 = false;
    this.isActiveBtn2 = false;
    this.isActiveBtn3 = false;
    this.isActiveBtn4 = true;
    this.isActiveBtn5 = false;
    this.router.navigate(["rutina"]);
  }

  Suplemento(){
    this.isHidden = true;
    this.isActiveBtn1 = false;
    this.isActiveBtn2 = false;
    this.isActiveBtn3 = false;
    this.isActiveBtn4 = false;
    this.isActiveBtn5 = true;
    this.router.navigate(["suplemento"]);
  }
}
