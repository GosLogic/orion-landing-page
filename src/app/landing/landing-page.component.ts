import { Component } from '@angular/core';

import { AnimateOnScrollDirective } from '../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  readonly year = new Date().getFullYear();
}
