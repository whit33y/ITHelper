import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title = 'Card title';
  @Input() number = 0;
  @Input() set svgContent(content: string) {
    this._svgContent = content || this._svgContent;
    this.safeSvgContent = this.sanitizer.bypassSecurityTrustHtml(content);
  }
  _svgContent: string = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-crop-1-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /></svg>`;
  safeSvgContent: SafeHtml = '';
  constructor(private sanitizer: DomSanitizer) {
    this.safeSvgContent = this.sanitizer.bypassSecurityTrustHtml(
      this._svgContent
    );
  }
}
