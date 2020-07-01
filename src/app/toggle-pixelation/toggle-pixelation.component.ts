import { Component, OnInit, HostListener } from '@angular/core';
import { MaskingService } from '../services/masking.service';

@Component({
  selector: 'app-toggle-pixelation',
  templateUrl: './toggle-pixelation.component.html',
  styleUrls: ['./toggle-pixelation.component.css']
})
export class TogglePixelationComponent implements OnInit {

  constructor(private maskingSvc: MaskingService) { }
  public pixelationOff: boolean = false;
  ngOnInit(): void {
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.code === 'KeyP') { this.togglePixelation(); }
  }

  public togglePixelation(): void{
    this.maskingSvc.togglePixelation();
    this.pixelationOff = !this.pixelationOff;
  }
}
