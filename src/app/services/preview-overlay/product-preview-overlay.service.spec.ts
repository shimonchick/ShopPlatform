import { TestBed } from '@angular/core/testing';

import { ProductPreviewOverlayService } from './product-preview-overlay.service';

describe('ProductPreviewOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPreviewOverlayService = TestBed.get(ProductPreviewOverlayService);
    expect(service).toBeTruthy();
  });
});
