import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Info } from '../info';
import { InfoService } from '../info.service';

import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.css']
})

export class DashboardComponent implements OnInit {

  information: Info[];

  error = '';
  success = '';

  selected = '';
  editItem = '';

  constructor(private route: ActivatedRoute, private infoService: InfoService) {  }

  ngOnInit() {
    this.getAll();
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

  addInfo(title: string, template: string): void {
    title = title.trim();
    this.infoService.addInfo(title, template)
      .subscribe(
        (res: Info[]) => {
          this.information = res;
          this.success = title + ' Created Successfully';
        },
        (err) => this.error = err
      );
  }

  updateInfo(title:string){
    const infos:Info[] = this.infoService.cloneInfo(this.information);
    for (let c in infos) {
      if(infos[c]["title"] == this.editItem){
        infos[c]["title"] = title;
        this.infoService.updateInfo( infos[c] )
          .subscribe(
            (res: Info) => {
              this.information[c] = res;
              this.success = 'Updated successfully';
            },
            (err) => this.error = err
          );
      }
      
    }
  }

  deleteInfo(id:number): void {
    this.infoService.deleteInfo(id)
    .subscribe(
      (res: Info[]) => {
        this.information = res;
        this.success = 'Deleted Successfully';
      },
      (err) => this.error = err
    );
  }

  selectListItem(item:string){ 
    console.log(item," - ",this.selected,"/",this.editItem);
    if(this.selected == item){ //Item selected 2nd time
      this.editItem = item; 
      this.selected = "";
    } else { 
      this.selected = item;
    }
  }

  
  

}
