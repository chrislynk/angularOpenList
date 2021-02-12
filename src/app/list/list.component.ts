import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import { CommonModule } from '@angular/common';

import { List } from '../info';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../app.component.css']
})

export class ListComponent implements OnInit {

  template: string = "List";
  title: string;

  list: List;

  error = '';
  success = '';

  selected = '';
  editItem = '';

  constructor(
    protected route: ActivatedRoute,
    protected infoService: InfoService
  ){ }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('title')?this.route.snapshot.paramMap.get('title').split('_').join(' '):null;
    this.getInfo();
  }

  getInfo(): void {
   // if(this.title != null){
      this.infoService.getTitle(this.title,this.template).subscribe(
        (res: List) => {
          this.list = res;
          console.log(this.list);
        },
        (err) => {
          this.error = err;
        }
      );
    //} else { this.error = "Something went wrong - Title"; }
  }

  updateInfo(info: List) {
    this.success = ''; this.error = ''; this.selected = '';  this.editItem='';
    this.infoService.updateInfo(info)
      .subscribe(
        (res: List) => {
          this.list = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  addListItem(item:string) {
    if(!this.list["content"]){ this.list["content"] = Array<String>(); }
    const info:List = this.infoService.cloneInfo(this.list);
    info["content"].push(item);
    this.updateInfo( info );
  }

  deleteListItem(item:string) {
    for (let c in this.list["content"]) {
      if(this.list["content"][c] == item){ 
        this.list["content"].splice(c,1);
        this.updateInfo(this.list);
      }
    }
  }
 
  selectListItem(item:string){ 
    if(this.selected == item){ //Item selected 2nd time
      this.editItem = item; 
      this.selected = "";
    } else { 
      this.selected = item;
    }
  }

  selectEditItem(item:string){ this.editItem = item; this.selected = ""; }

  updateListItem(item:string){
    const info:List = this.infoService.cloneInfo(this.list);
    for (let c in info["content"]) {
      if(info["content"][c] == this.editItem){ 
        info["content"][c] = item;
        this.updateInfo( info );
      }
    }
  }

}
