import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../app.component.css','./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement: ElementRef;

  sticky: boolean = false;
  template: string = "";


  elementPosition: any;

  constructor( private router: Router) { 
  
    
   }

  ngOnInit(): void {
    //const title = this.route.snapshot.paramMap.get('title')?this.route.snapshot.paramMap.get('title').split('_').join(' '):null;
    console.log(window.location.pathname.substring(1));
    this.router.events.subscribe(
    (event: NavigationEvent) => {
      if(event instanceof ActivationStart) {
        console.log("start ", event.snapshot, " - ");
      }
      if(event instanceof NavigationEnd) {
        console.log("END ", event.url, " - ");
      }
    });

    
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
    
 

  }

  

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll >= this.elementPosition){
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }
 

}
