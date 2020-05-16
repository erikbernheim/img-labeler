import { Component, OnInit } from '@angular/core';
import { MaskingService } from '../services/masking.service';

@Component({
  selector: 'app-revert-from-history',
  templateUrl: './revert-from-history.component.html',
  styleUrls: ['./revert-from-history.component.css']
})
export class RevertFromHistoryComponent implements OnInit {
  public previousMasks: { id: string, data: any, key: string }[];
  constructor(private maskSvc: MaskingService) { }

  ngOnInit(): void {
    let i = this.loadMasksFromStorage()
    if (i >= 31) {
      alert(`You currently have ${i - 1} masks in in local storage. img-labeler recommends you don't exceed 30, consider deleting some under the Advanced dropdown`)
    }
  }

  public loadMasksFromStorage(): number{
    this.previousMasks = [];
    const storage = Object.entries(localStorage);
    let i = 0;
    for (const item of storage) {
      if (!item[0].includes('gitToken')) {
        const id = item[0].match(/[\w-]+\.(png|jpg)/)[0].substring(0, 4);
        this.previousMasks.push({ id: id, data: item[1], key: item[0] });
      }
      i++;
    }
    return i;
  }
  public revert(collection: string): void {
    this.maskSvc.revert(collection);
  }

  public delete(key: string): void {
    console.log(key)
    localStorage.removeItem(key);
  this.loadMasksFromStorage();
  }

}
