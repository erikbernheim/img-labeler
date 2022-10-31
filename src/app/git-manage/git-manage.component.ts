import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitService } from '../git.service';
import { switchMap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaskingService } from '../services/masking.service';
import { SvgtopngService } from '../services/svgtopng.service';

@Component({
  selector: 'app-git-manage',
  templateUrl: './git-manage.component.html',
  styleUrls: ['./git-manage.component.css']
})
export class GitManageComponent implements OnInit {

  constructor(private git: GitService, private ngxService: NgxUiLoaderService,
  private maskSvc: MaskingService, private svgToPng: SvgtopngService) { }
  public authenticated = false;
  public errorOccurred = false;
  public userData;
  public branches;
  public commitReturn: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('gitToken') && localStorage.getItem('gitToken') != 'ERROR'){
      this.gitLoad();
    }
  }

  public gitLoad(){
    this.commitReturn = false;
    this.git.getUserInfo().pipe(
      switchMap( ret => {
        this.userData = ret;
        return this.git.getRepoBranches(ret.login);
      })
    )
  .subscribe((ret) => {
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
    let imgUrl = this.maskSvc.currentUrl.match(/[\w-]+\.png/)[0];
    const imgs2 = (imgUrl.indexOf('_') === 5);
    const imgsd = (imgUrl.indexOf('_') === -1);
    this.svgToPng.base64ToGit()
    .then(base64 => {
    this.ngxService.start();
    let defaultMessage = `${imgUrl.replace('_', '').substr(0, 4)} ${this.userData.login}`
    if(imgs2){
      defaultMessage = `${imgUrl.replace('_', '').substr(0, 6)} ${this.userData.login}`
    } else if(imgsd) 
    {
      defaultMessage = `${imgUrl.replace('_', '').substr(0, 5)} ${this.userData.login}`
    }
    const commitMessage =  prompt('Enter Commit Message', defaultMessage).valueOf();
    this.git.getTree(this.userData.login, sha).pipe(
      switchMap(ret => {
        if(imgs2) { return this.git.getTree(this.userData.login, ret.tree.filter(item => item.path === 'masks2')[0].sha); }
        else if(imgsd)
        {
          return this.git.getTree(this.userData.login, ret.tree.filter(item => item.path === 'masksd')[0].sha);
        }
        else{
          return this.git.getTree(this.userData.login, ret.tree.filter(item => item.path === 'masks')[0].sha);
        }
      })
    )
    .pipe(
      switchMap(ret => {
      return this.git.commitFile(this.userData.login, commitMessage, this.svgToPng.base64Mask.replace('data:image/png;base64,', ''),
          ret.tree.filter(mask => mask.path === imgUrl)[0].sha, branch, imgUrl);
      })
    ).subscribe(ret => {
      this.commitReturn = true;
      this.ngxService.stop();
    });
    }); 
  }

}
