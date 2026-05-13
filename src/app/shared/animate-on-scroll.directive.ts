import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject } from '@angular/core';

export type RevealMode = 'reveal-up' | 'reveal-right' | 'reveal-scale';

@Directive({
  selector: '[reveal]',
  standalone: true,
})
export class AnimateOnScrollDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Animation type; default reveal-up when attribute has no value. */
  @Input() reveal: RevealMode | string = 'reveal-up';
  /** Optional class: delay-100 | delay-200 | delay-300 | delay-400 */
  @Input() revealDelay = '';

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    const mode = this.normalizeMode(this.reveal);
    el.classList.add('reveal', mode);
    if (this.revealDelay) {
      el.classList.add(this.revealDelay);
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('visible');
      return;
    }

    if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('visible');
          this.observer?.disconnect();
          this.observer = undefined;
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -28px 0px' },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private normalizeMode(v: unknown): RevealMode {
    if (v === 'reveal-right' || v === 'reveal-scale') {
      return v;
    }
    return 'reveal-up';
  }
}
