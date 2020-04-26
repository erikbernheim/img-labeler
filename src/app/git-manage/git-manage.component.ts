import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitService } from '../git.service';
import { switchMap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-git-manage',
  templateUrl: './git-manage.component.html',
  styleUrls: ['./git-manage.component.css']
})
export class GitManageComponent implements OnInit {

  constructor(private git: GitService, private ngxService: NgxUiLoaderService) { }
  public authenticated = false;
  public errorOccurred = false;
  public userData;
  public branches;
  public commitReturn: boolean = false;
  @Output() getImage = new EventEmitter<boolean>();
  @Input() gitImage: string;
  @Input() imageName: string;
  ngOnInit(): void {
    if(localStorage.getItem('gitToken') && localStorage.getItem('gitToken') != 'ERROR'){
      this.gitLoad();
    }
  }

  public gitLoad(){
    this.commitReturn = false;
    this.git.getUserInfo().pipe(
      switchMap( ret => {
        console.log(ret);
        this.userData = ret;
        return this.git.getRepoBranches(ret.login);
      })
    )
  .subscribe((ret) => {
    console.log(ret);
    this.branches = ret;
    this.authenticated = true;
  },
  error => {
    this.logout();

  });
  }

  public logout(){
    localStorage.removeItem('gitToken');
    this.authenticated = false;
  }

  public githubAuthenticate() {
    const s = window.open('https://github.com/login/oauth/authorize?client_id=efab4921711c71a51b5b&scope=public_repo', '_blank');
    const timer = setInterval(() => {
            if (s.closed) {
                if (localStorage.getItem('gitToken') === 'ERROR') {
                  this.errorOccurred = true;
                  clearInterval(timer);
                } else {
                  clearInterval(timer);
                  this.gitLoad();
                }
            }
        }, 1000);
  }

  public commit(sha: string, branch: string): void {
    this.getImage.emit(true);
    this.ngxService.start();
    setTimeout(() => {
    const commitMessage =  prompt('Enter Commit Message', `${this.imageName.substr(0, 4)} ${this.userData.login}`).valueOf();
    console.log(this.gitImage);
    console.log(this.imageName);
    this.git.getTree(this.userData.login, sha).pipe(
      switchMap(ret => {
        console.log(ret.tree);
        console.log(ret.tree.filter(item => item.path === 'masks')[0]);
        return this.git.getTree(this.userData.login, ret.tree.filter(item => item.path === 'masks')[0].sha);
      })
    )
    .pipe(
      switchMap(ret => {
      console.log(ret.tree.filter(mask => mask.path === this.imageName)[0].sha);
      return this.git.commitFile(this.userData.login, commitMessage, this.gitImage.replace('data:image/png;base64,', ''),
          ret.tree.filter(mask => mask.path === this.imageName)[0].sha, branch, this.imageName);
      })
    ).subscribe(ret => {
      console.log(ret);
      this.commitReturn = true;
      this.ngxService.stop();
    });
  }, 750);
  }

}
