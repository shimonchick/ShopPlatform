import {ComponentRef, Injectable, Injector} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Product} from '../../models/product';
import {PRODUCT_PREVIEW_DIALOG_DATA} from '../../products/product-preview/preview-data';
import {ProductPreviewOverlayRef} from './overlay-ref';
import {ProductDetailOverlayComponent} from '../../products/product-detail/product-detail-overlay.component';

interface ProductPreviewDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    product?: Product;
}


const DEFAULT_CONFIG: ProductPreviewDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'tm-file-preview-dialog-panel',
    product: null
};

@Injectable()
export class ProductPreviewOverlayService {

    constructor(
        private injector: Injector,
        private overlay: Overlay) {
    }

    open(config: ProductPreviewDialogConfig = {}) {
        // Override default configuration
        const dialogConfig = {...DEFAULT_CONFIG, ...config};

        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(dialogConfig);

        // Instantiate remote control
        const dialogRef = new ProductPreviewOverlayRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private createOverlay(config: ProductPreviewDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(overlayRef: OverlayRef, config: ProductPreviewDialogConfig, dialogRef: ProductPreviewOverlayRef) {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(ProductDetailOverlayComponent, null, injector);
        const containerRef: ComponentRef<ProductDetailOverlayComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(config: ProductPreviewDialogConfig, dialogRef: ProductPreviewOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(ProductPreviewOverlayRef, dialogRef);
        injectionTokens.set(PRODUCT_PREVIEW_DIALOG_DATA, config.product);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(config: ProductPreviewDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global();
            // .centerHorizontally()
            // .centerVertically();

        return new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy
        });
    }
}
