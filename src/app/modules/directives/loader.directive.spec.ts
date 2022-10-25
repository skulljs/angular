import { ElementRef } from '@angular/core';
import { LoaderDirective } from './loader.directive';

describe('LoaderDirective', () => {
  it('should create an instance', () => {
    const directive = new LoaderDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
