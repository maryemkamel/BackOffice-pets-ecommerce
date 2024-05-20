import { Component, OnInit } from '@angular/core';
import { Subcategory} from '../model/subcategory';
import { SubcategoriesService } from '../services/subcategories.service';
import { Category } from '../model/category';
import { ConfirmationDialogService } from '../commun/confirm-dialog/confirmation-dialog.service';




@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit{
  showSuccessDeleteAlert: boolean = false;
  showErrorDeleteAlert: boolean = false;
  showSuccessUpdateAlert: boolean = false;
  showErrorUpdateAlert: boolean = false;
  subcategories: Subcategory[] = [];
  categories:Category[]=[];
  editedSubCategory: any = null;
  newSubcategory: Partial<Subcategory> = {
    name: '',
    categoryId:0,
  };



  constructor(private subcategoriesService: SubcategoriesService , private confirmationDialogService: ConfirmationDialogService) {
  }
  public openConfirmationDialog(subcategoryId: Number): void {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this subcategory?')
      .then((confirmed) => {
        if (confirmed) {
          this.deleteSubcategory(subcategoryId);
        }
      })
      .catch(() => console.log('User dismissed the dialog'));
  }
  ngOnInit(): void {
    // Fetch all categories when the component initializes
    this.getAllSubategories();
    this.getAllCategories();
    //console.log()
  }
  getAllSubategories(): void {
    this.subcategoriesService.getAllSubcategories().subscribe(data => {
      this.subcategories = data;
      console.log('Subcategory loaded:', this.subcategories);
    })
  }
  getAllCategories(): void {
    this.subcategoriesService.getAllCategories().subscribe(data => {
      this.categories = data;
      console.log('Categories loaded:', this.categories);
    })
  }
  createSubCategory(): void {
    console.log('Attempting to create subcategory with:', this.newSubcategory);  // Ajout du log pour déboguer

    // Vérifiez d'abord si le nom de la sous-catégorie est défini et si une catégorie a été sélectionnée
    if (this.newSubcategory.name && this.newSubcategory.categoryId) {
      // Ensuite, envoyez la requête pour créer la sous-catégorie en utilisant le service approprié
      this.subcategoriesService.createSubCategory(this.newSubcategory).subscribe(
        (newlyCreatedSubcategory: Subcategory) => {
          // Une fois la sous-catégorie créée avec succès, vous pouvez ajouter la nouvelle sous-catégorie à la liste existante
          this.subcategories.push(newlyCreatedSubcategory);
          // Ensuite, réinitialisez les valeurs du formulaire
          this.newSubcategory = {
            name: '',
            categoryId: 0 // Réinitialisez également l'identifiant de catégorie sélectionné
          };
        },
        (error) => {
          // Gérez les erreurs si nécessaire
          console.error('Error creating subcategory:', error);
        }
      );
    } else {
      // Si le nom de la sous-catégorie ou l'identifiant de la catégorie n'est pas défini, affichez un message d'erreur ou effectuez d'autres actions nécessaires
      console.error('Subcategory name or category ID is missing.');
    }
  }


  deleteSubcategory(subcategoryId: Number): void {
    this.subcategoriesService.deleteSubCategory(subcategoryId).subscribe(
      () => {
        this.subcategories = this.subcategories.filter((subcategory) => subcategory.id !== subcategoryId);
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
    this.subcategoriesService.getAllSubcategories().subscribe((subcategories)=>{
      this.subcategories=subcategories;
    })
  }


  openEditModal(subcategoryId: Number): void {
    console.log('Open edit modal for subcategory ID:', subcategoryId);
    this.subcategoriesService.getSubCategoryById(subcategoryId).subscribe(
      (subcategory: Subcategory) => {
        console.log('Subcategory fetched:', subcategory);
        this.editedSubCategory = { ...subcategory };


        // Ouvrez le modal en utilisant JavaScript natif
        const modal = document.getElementById('editSubcategoryModal');
        if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
        }
      },
      (error) => {
        console.error('Error fetching subcategory by ID:', error);
      }
    );
  }
  closeEditModal(): void {
    const modal = document.getElementById('editSubcategoryModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  saveSubcategory(): void {
    if (this.editedSubCategory) {
      this.subcategoriesService.updateSubCategory(this.editedSubCategory.id, this.editedSubCategory).subscribe(
        () => {
          this.showSuccessUpdateAlert = true;
          this.loadCategory();

          setTimeout(() => {
            this.showSuccessUpdateAlert = false;
          }, 2500);
          const modal = document.getElementById('editSubcategoryModal');
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


