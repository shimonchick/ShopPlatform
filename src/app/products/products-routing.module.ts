import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {SearchComponent} from './search/search.component';

const routes = [
    {path: '', component: SearchComponent},
    {path: 'create', loadChildren: './product-set/product-set.module#ProductSetModule'},
    {path: ':id', component: ProductDetailComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}
