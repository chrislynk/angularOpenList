import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Info } from '../info';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.css']
})

export class DashboardComponent implements OnInit {
  information: Info[];
  safeTitle: {};
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private infoService: InfoService
  ) { }

  ngOnInit() {
    this.getInformation();
  }

  getAll(): void {
    this.infoService.getAll().subscribe(
      (res: Info[]) => {
        this.information = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getId(id:number): void {
    this.success = ''; this.error = '';
    this.infoService.getId(id).subscribe(
      (res: Info) => {
        this.information.push(res);
      },
      (err) => {
        this.error = err+" ("+id+")";
      }
    );
  }

  getDashboard(name: string): void{
    let ids: Number[]; //Dashboard contains a list of Ids of other Infos
    this.infoService.getTitle(name, "Dashboard").subscribe(
      (res: Info) => {
        for (let i in res["content"]) {
          this.getId(+i);
        }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getInformation(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if(title == null){ this.getAll(); } else { this.getDashboard(title); }
  }

  addInfo(name: string): void {
    console.log(name);
    name = name.trim();
  
    this.infoService.addInfo(name)
      .subscribe(
        (res: Info[]) => {
          this.information = res;
          this.success = 'Created Successfully';
          console.log(res);
        },
        (err) => this.error = err
      );
  }

  deleteInfo(name:string): void {
    for (let c in this.information) {
      if(c["title"] == name){ 
        this.infoService.deleteInfo(c["id"]);
      }
    }
  }

}
