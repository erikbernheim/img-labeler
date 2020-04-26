import { Component, OnInit } from '@angular/core';
import { GitService } from '../git.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.css']
})
export class GitComponent implements OnInit {

  constructor(private git: GitService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get("code"))
    this.git.getGithubToken(this.route.snapshot.queryParamMap.get("code")).subscribe( ret => {
      if (!ret.toString().includes('error')) {
        localStorage.setItem('gitToken', 'Bearer ' + ret.toString().match(/(?<==)(.*?)(?=&)/)[0]);
        window.close();
      } else {
        localStorage.setItem('gitToken', 'ERROR');
      }
    });
  }
}
