import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitService } from './git.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private route: ActivatedRoute, private git: GitService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params.code){
        this.git.getGithubToken(params.code).subscribe( ret => {
          if (!ret.toString().includes('error')) {
            localStorage.setItem('gitToken', 'Bearer ' + ret.toString().match(/(?<==)(.*?)(?=&)/)[0]);
            window.close();
          } else {
            localStorage.setItem('gitToken', 'ERROR');
            window.close();
          }
        });
      }
    });
  }
  title = 'img-labeler';
}
