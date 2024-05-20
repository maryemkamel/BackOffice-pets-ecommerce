import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Category} from '../model/category';
import { Subcategory} from '../model/subcategory';

const apiUrl = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}/products/`);
  }

  deleteProduct(productId: Number): Observable<any>{
    return this.http.delete(apiUrl+"/products/"+ productId);
  }
  createProduct(product: any): Observable<any> {
    return this.http.post(apiUrl + "/products/create", product);
  }
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(apiUrl+"/categories/");
  }
  getAllSubCategories():Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(apiUrl+"/subcategories/");
  }
  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put(apiUrl + "/products/" + productId, product);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get(apiUrl + "/products/" + productId);
  }
  getAllProductsWithPagination(page: number, pageSize: number): Observable<any> {
    const url = `http://localhost:8080/products/pagination?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  searchProductsByName(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/products/search?productName=${productName}`);
  }

}
