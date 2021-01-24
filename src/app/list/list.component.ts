import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import { CommonModule } from '@angular/common';

import { Info } from '../info';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../app.component.css']
})

export class ListComponent implements OnInit {
  lists: Info[];
  id: number;
  content: Array<string>;
  title: string;
  search = '';
  selected = '';
  error = '';
  success = '';
  constructor(
    private route: ActivatedRoute,
    private infoService: InfoService
  ){ }

  ngOnInit() {
    this.getInfo();
  }

  getInfo(): void {
    this.success = ''; this.error = ''; this.search = ''; this.selected = '';
    const title = this.route.snapshot.paramMap.get('title')?this.route.snapshot.paramMap.get('title').split('_').join(' '):null;
    console.log(title);
    if(title){
      this.infoService.getTitle(title,"List").subscribe(
        (res: Info) => {
          this.title = res["title"];
          this.content = res["content"]?res["content"]:new Array();
          this.id = res["id"];
        },
        (err) => {
          this.error = err;
        }
      );
    } else {
      this.infoService.getTemplates("List").subscribe(
        (res: Info[]) => {
          this.lists = res;
        },
        (err) => {
          this.error = err;
        }
      );
    }
  }

  updateInfo(title:string, content, id:number) {
    this.success = ''; this.error = ''; this.search = ''; this.selected = '';
  
    this.infoService.updateInfo({ title: title, content: content, id: +id, template: "List" })
      .subscribe(
        (res: Info) => {
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  addInfo(item:string) {
    this.content.push(item);
    this.updateInfo( this.title, this.content, +this.id );
  }

  deleteInfo(item:string) {
    for (let c in this.content) {
      if(this.content[c] == item){ 
        const i = +c;
        this.content.splice(i,1);
        this.updateInfo( this.title, this.content, +this.id );
      }
    }
  }

  selectInfo(item:string){
    this.selected = item;
    
  }

  updateSelected(item:string){
    for (let c in this.content) {
      if(this.content[c] == this.selected){ 
        const i = +c;
        this.content[i] = item;
        this.updateInfo( this.title, this.content, +this.id );
      }
    }
  }

}
