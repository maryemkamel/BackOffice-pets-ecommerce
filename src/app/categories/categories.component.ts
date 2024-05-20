import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category} from '../model/category';

import { ConfirmationDialogService } from '../commun/confirm-dialog/confirmation-dialog.service';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  //postCategoryForm!: FormGroup;
  //showForm: boolean = false;
  editedCategoryId: number | null = null;
  categories: any[] = [];
  showSuccessDeleteAlert: boolean = false;
  showErrorDeleteAlert: boolean = false;
  showSuccessUpdateAlert: boolean = false;
  showErrorUpdateAlert: boolean = false;


  newCategory: Partial<Category> = {
    name: '',
  };
  editedCategory: any = null; // Ou initialisé à un objet vide : editedCategory: any = {};
  constructor(private categoriesService: CategoriesService, private confirmationDialogService: ConfirmationDialogService) {
  }

  public openConfirmationDialog(categoryId: Number): void {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this category?')
      .then((confirmed) => {
        if (confirmed) {
          this.deleteCategory(categoryId);
        }
      })
      .catch(() => console.log('User dismissed the dialog'));
  }


  ngOnInit(): void {
    this.getAllCategories();

  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe(data => {
      this.categories = data;
      console.log('Categories loaded:', this.categories);
    })
  }


  createCategory(): void {
    this.categoriesService.createCategory(this.newCategory).subscribe(
      (newlyCreatedCategory: Category) => {
        this.categories.push(newlyCreatedCategory);
        this.newCategory = {
          name: '',

        };
      }
    );
  }
  deleteCategory(categoryId: Number): void {
    this.categoriesService.deleteCategory(categoryId).subscribe(
      () => {
        this.categories = this.categories.filter((category) => category.id !== categoryId);
        this.showSuccessDeleteAlert = true;
        setTimeout(() => {
          this.showSuccessDeleteAlert = false;
        }, 2500);
      },
      (error) => {
        this.showErrorDeleteAlert = true;
        setTimeout(() => {
          this.showErrorDeleteAlert = false;
        }, 2500);
      }
    );
  }

  loadCategory(){
    this.categoriesService.getAllCategories().subscribe((categories)=>{
      this.categories=categories;
    })
  }


  openEditModal(categoryId: Number): void {
    console.log('Open edit modal for category ID:', categoryId);
    this.categoriesService.getCategoryById(categoryId).subscribe(
      (category: Category) => {
        console.log('Category fetched:', category);
        this.editedCategory = { ...category };

        // Ouvrez le modal en utilisant JavaScript natif
        const modal = document.getElementById('editCategoryModal');
        if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
        }
      },
      (error) => {
        console.error('Error fetching category by ID:', error);
      }
    );
  }
  closeEditModal(): void {
    const modal = document.getElementById('editCategoryModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }



  saveCategory(): void {
    if (this.editedCategory) {
      this.categoriesService.updateCategory(this.editedCategory.id, this.editedCategory).subscribe(
        () => {
          this.showSuccessUpdateAlert = true;
          this.loadCategory();

          setTimeout(() => {
            this.showSuccessUpdateAlert = false;
          }, 2500);
          const modal = document.getElementById('editCategoryModal');
          if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
          }
        },
        (error) => {
          this.showErrorUpdateAlert = true;
          setTimeout(() => {
            this.showErrorUpdateAlert = false;
          }, 2500);
        }
      );
    }
  }

}
