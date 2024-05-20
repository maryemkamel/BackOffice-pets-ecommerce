import { Subcategory } from './../model/subcategory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category} from '../model/category';

const apiUrl = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private http: HttpClient) {}

  getAllSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(apiUrl + "/subcategories/");
  }
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(apiUrl+"/categories/");
  }

  createSubCategory(Subcategory: any):Observable<any>{
    return this.http.post(apiUrl+"/subcategories/create", Subcategory);
  }
  deleteSubCategory(SubcategoryId: Number): Observable<any>{
    return this.http.delete(apiUrl+"/subcategories/"+ SubcategoryId);
  }
  updateSubCategory(SubcategoryId: Number, Subcategory: any): Observable<any>{
    return this.http.put(apiUrl+"/subcategories/"+ SubcategoryId, Subcategory);
  }
  getSubCategoryById(subcategoryId: Number): Observable<any>{
    return this.http.get(apiUrl+"/subcategories/"+ subcategoryId);
  }


  /*
  createSubcategory(subcategory: any): Observable<any> {
    return this.http.post(apiUrl + "/catalogues/api/subcategories/create", subcategory);
  }

  getSubcategoryById(subcategoryId: number): Observable<any> {
    return this.http.get(apiUrl + "/catalogues/api/subcategories/" + subcategoryId);
  }

  updateSubcategory(subcategoryId: number, subcategory: any): Observable<any> {
    return this.http.put(apiUrl + "/catalogues/api/subcategories/" + subcategoryId, subcategory);
  }

  deleteSubcategory(subcategoryId: number): Observable<any> {
    return this.http.delete(apiUrl + "/catalogues/api/subcategories/" + subcategoryId);
  }
  */
}
