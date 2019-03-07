import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductCreateComponent} from './product-create/product-create.component';

const routes: Routes = [
    {
        path: 'products', children: [
            {path: '', component: ProductsComponent},
            {path: 'create', component: ProductCreateComponent},
            {path: ':id', component: ProductDetailComponent},
        ],

    },

    // {path: '', redirectTo: 'products', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
