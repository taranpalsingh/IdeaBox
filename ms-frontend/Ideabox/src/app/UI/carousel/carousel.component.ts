import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  slides = [
    { 
      src: "../../assets/Images/login-carousel1.png", 
      title: "Post your talent!!",
      desc: "Select the category and show your talent to the world."
    },
    { 
      src: "../../assets/Images/login-carousel2.png", 
      title: "Get it reviewed!",
      desc: "Get help from expert to become the best."
    },
    { 
      src: "../../assets/Images/login-carousel3.png", 
      title: "Become an expert!",
      desc: "Become an expert and review others to earn money."
    }
  ];

  currentSlide = 0;
  // selectedIndex = 1;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlide++;
      if(this.currentSlide >= this.slides.length){
        this.currentSlide = 0;
      }
    }, 3000);
  }

  setCurrentSlide(index){
    console.log(index);
    this.currentSlide = index;
  }

}
