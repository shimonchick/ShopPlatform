import {InjectionToken} from '@angular/core';
import {Product} from '../../models/product';

export const PRODUCT_PREVIEW_DIALOG_DATA = new InjectionToken<Product>('PRODUCT_PREVIEW_DIALOG_DATA');
