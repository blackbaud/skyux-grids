import * as polyfills from './polyfills';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  template: `
    <div id="one">one</div>
    <div id="two">two</div>
    <div id="three">three</div>

    <div id="parent">
      <div>
        <a href="#" id="hyperlink">
          <span id="child"></span>
        </a>
      </div>
    </div>
  `
})
export class PolyfillTestComponent {
}

describe('Polyfills', () => {
  let fixture;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolyfillTestComponent],
      providers: []
    });
    fixture = TestBed.createComponent(PolyfillTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('elementMatches()', () => {

    it('should return true if element matches', () => {
      let targetEl = nativeElement.querySelector('#one');
      let actual = polyfills.elementMatches(targetEl, '#one');

      expect(actual).toBe(true);
    });

    it('should return false if element does not match', () => {
      let targetEl = nativeElement.querySelector('#two');
      let actual = polyfills.elementMatches(targetEl, '#one');

      expect(actual).toBe(false);
    });

  });

  describe('getClosest()', () => {

    it('should find the closest element through several ancestors', () => {
      let parentEl = nativeElement.querySelector('#parent');
      let childEl = nativeElement.querySelector('#child');
      let actual = polyfills.getClosest(childEl, '#parent');

      expect(actual).toEqual(parentEl);
    });

    it('should find the closest element through a single ancestor', () => {
      let parentEl = nativeElement.querySelector('#hyperlink');
      let childEl = nativeElement.querySelector('#child');
      let actual = polyfills.getClosest(childEl, 'a');

      expect(actual).toEqual(parentEl);
    });

    it('should return undefined if no ancestor is found', () => {
      let childEl = nativeElement.querySelector('#child');
      let actual = polyfills.getClosest(childEl, '#not-found');

      expect(actual).toBeUndefined();
    });

    it('should return undefined if no ancestor is found', () => {
      let childEl = nativeElement.querySelector('#child');
      let actual = polyfills.getClosest(childEl, '#not-found');

      expect(actual).toBeUndefined();
    });

    it('should return undefined if the selector is not found', () => {
      let notFoundEl = nativeElement.querySelector('#not-found');
      let actual = polyfills.getClosest(notFoundEl, '#foo');

      expect(actual).toBeUndefined();
    });
  });

});
