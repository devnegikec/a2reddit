import { Component, EventEmitter } from '@angular/core';
import { Product } from './product.model';
import { ProductImage } from './productImage.component';


/**
 * @ProductDepartment: A component to show the breadcrumbs to a 
 * Product's department
 */
@Component({
  selector: 'product-department',
  inputs: ['product'],
  template: `
  <div class="product-department">
    <span *ngFor="let name of product.department; let i=index">
      <a href="#">{{ name }}</a>
      <span>{{i < (product.department.length-1) ? '>' : ''}}</span>
    </span>
  </div>
  `
})
class ProductDepartment {
  product: Product;
}

/**
 * @PriceDisplay: A component to show the price of a 
 * Product
 */
@Component({
  selector: 'price-display',
  inputs: ['price'],
  template: `
  <div class="price-display">{{ price | currency:'EUR':true}}</div>
  `
})
class PriceDisplay {
  price: number;
}

/**
 * @ProductRow: A component for the view of single Product
 */
@Component({
  selector: 'product-row',
  inputs: ['product'],
  host: {'class': 'item'},
  directives: [ProductImage, ProductDepartment, PriceDisplay],
  template: `
  <product-image [product]="product"></product-image>
  <div class="content">
    <div class="header">{{ product.name }}</div>
    <div class="meta">
      <div class="product-sku">SKU #{{ product.sku }}</div>
    </div>
    <div class="description">
      <product-department [product]="product"></product-department>
    </div>
  </div>
  <price-display [price]="product.price"></price-display>
  `
})
class ProductRow {
  product: Product;
}

/**
 * @ProductsList: A component for rendering all ProductRows and 
 * storing the currently selected Product
 */
@Component({
  selector: 'products-list',
  directives: [ProductRow],
  inputs: ['productList'],
  outputs: ['onProductSelected'],
  template: `
  <div class="ui items">
    <product-row 
      *ngFor="let myProduct of productList" 
      [product]="myProduct" 
      (click)='clicked(myProduct)'
      [class.selected]="isSelected(myProduct)">
    </product-row>
  </div>
  `
})
export class ProductsList {
  /**
   * @input productList - the Product[] passed to us
   */
  productList: Product[];

  /**
   * @ouput onProductSelected - outputs the current 
   *          Product whenever a new Product is selected
   */
  onProductSelected: EventEmitter<Product>;

  /**
   * @property currentProduct - local state containing 
   *             the currently selected `Product`
   */
  currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter();
  }

  clicked(product: Product): void {
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false;
    }
    return product.sku === this.currentProduct.sku;
  }

}


