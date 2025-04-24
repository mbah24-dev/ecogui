import { Product } from './product.service';

export interface CartItem  {
    quantity: number | 1
    product: Product;
}
