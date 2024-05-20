import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category} from '../model/category';



const apiUrl=["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private http: HttpClient) {}

  // Method to fetch categories from the backend
  //getCategories(): Observable<any[]> {
  // return this.http.get<any[]>(this.apiUrl);
  //}
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(apiUrl+"/categories/");
  }
  deleteCategory(categoryId: Number): Observable<any>{
    return this.http.delete(apiUrl+"/categories/"+ categoryId);
  }

  createCategory(Category: any):Observable<any>{
    return this.http.post(apiUrl+"/categories/create", Category);
  }
  updateCategory(categoryId: Number, Category: any): Observable<any>{
    return this.http.put(apiUrl+"/categories/"+ categoryId, Category);
  }
  getCategoryById(categoryId: Number): Observable<any>{
    return this.http.get(apiUrl+"/categories/"+ categoryId);
  }

  /*
      createCategory(Category: any):Observable<any>{
        return this.http.post(apiUrl+"/catalogues/api/categories/create", Category);
      }

      getCategoryById(categoryId: Number): Observable<any>{
        return this.http.get(apiUrl+"/catalogues/api/categories/"+ categoryId);
      }

      updateCategory(categoryId: Number, Category: any): Observable<any>{
        return this.http.put(apiUrl+"/catalogues/api/categories/"+ categoryId, Category);
      }

      deleteCategory(categoryId: Number): Observable<any>{
        return this.http.delete(apiUrl+"/catalogues/api/categories/"+ categoryId);
      }
      */
}
