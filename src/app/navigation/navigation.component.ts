import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment, NavigationEnd, Event as NavigationEvent, Params, ParamMap } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../app.component.css','./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement: ElementRef;

  sticky: boolean = false;
  elementPosition: any;

  title: string;
  breadcrumbs: any[] = [];

  constructor( private router:Router, private active:ActivatedRoute) { 
  
    
   }

  ngOnInit(): void {
    
    this.router.events.subscribe(
    (event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.breadcrumbs = this.active.firstChild.snapshot.data.breacrumb;
        this.title = this.active.firstChild.snapshot.params.title;
        console.log(this.breadcrumbs, this.title);
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