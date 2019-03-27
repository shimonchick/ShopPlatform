import { Injectable } from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ProductPreviewComponent} from '../products/product-preview/product-preview.component';

// Each property can be overridden by the consumer
interface ProductPreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductPreviewOverlayService {

  constructor(private overlay: Overlay) { }

  open(config: ProductPreviewDialogConfig = {}) {
    const overlayRef = this.overlay.create();
    const productPreviewPortal = new ComponentPortal(ProductPreviewComponent);
    overlayRef.attach(productPreviewPortal);
  }
}
