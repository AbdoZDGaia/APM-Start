import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    imageShown: boolean = false;
    filteredBy: string;
    filteredProducts: IProduct[];
    products: IProduct[];
    private _listFilter: string;
    errorMsg = "";

    constructor(private productService: ProductService) {
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((products: IProduct) =>
            products.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
        );
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMsg = err
        });
    }

    toggleImage(): void {
        this.imageShown = !this.imageShown;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }

    public get listFilter(): string {
        return this._listFilter;
    }

    public set listFilter(v: string) {
        this._listFilter = v;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

}