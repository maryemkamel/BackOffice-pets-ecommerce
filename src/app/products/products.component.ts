import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product'; // Assurez-vous que le chemin vers Product est correct
import { ProductsService } from '../services/products.service'; // Assurez-vous que le chemin vers ProductsService est correct
import { ConfirmationDialogService } from '../commun/confirm-dialog/confirmation-dialog.service';
//import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  showSuccessDeleteAlert: boolean = false;
  showErrorDeleteAlert: boolean = false;
  showSuccessUpdateAlert: boolean = false;
  showErrorUpdateAlert: boolean = false;
  editedProduct: any = {};
  categories: any[] = [];

  subcategories: any[] = [];
  allSubcategories: any[] = [];
  newProduct: Partial<Product> = {
    name: '',
    shortDescription: '',
    longDescription: '',
    image: '',
    price: 0,
    categoryId: 0,
    subCategoryId: 0,
    stockQuantity: 0,
    active: false,
  };
  page = 0;
  pageSize = 5; // Nombre d'éléments par page
  totalItems = 0;
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;




  constructor(private productsService: ProductsService, private confirmationDialogService: ConfirmationDialogService) {


  }
  onCategoryChange(event: Event) {
    const categoryId = +(event.target as HTMLSelectElement).value; 
    console.log('Selected Category ID:', categoryId); 
    console.log('All SubCategories:', this.allSubcategories); 
  console.log(this.subcategories)
    this.subcategories = this.allSubcategories.filter(subcategory => {
      console.log('Checking SubCategory:', subcategory); 
      console.log(this.subcategories)
      return subcategory.categoryId === categoryId;
    });
    console.log('Filtered SubCategories:', this.subcategories); 
  }
  ngOnInit(): void {
    this.loadProductsWithPagiantion();
     this.getAllProducts();
    this.getAllSubCategories();
    this.getAllCategories();
    
  }
  getAllCategories(): void {
    this.productsService.getAllCategories().subscribe(data => {
      this.categories = data;
      console.log('Categories loaded:', this.categories);
    })
  }
  getAllSubCategories(): void {
    this.productsService.getAllSubCategories().subscribe(data => {
      this.allSubcategories = data;
      console.log('Categories loaded:', this.allSubcategories);
    })
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

    }
  }
  


  public openConfirmationDialog(productId: Number): void {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this product?')
      .then((confirmed) => {
        if (confirmed) {
          this.deleteProduct(productId);
        }
      })
      .catch(() => console.log('User dismissed the dialog'));
  }



  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log('Products loaded:', this.products);
    });
  }
  deleteProduct(productId: Number): void {
    this.productsService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter((product) => product.id !== productId);
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
  createProduct(): void {
    this.productsService.createProduct(this.newProduct).subscribe(
      (newlyCreatedProduct: Product) => {
        this.products.push(newlyCreatedProduct);
        this.newProduct = {
          name: '',
          shortDescription: '',
          longDescription: '',
          image: '',
          price: 0,
          categoryId: 0,
          subCategoryId: 0,
          stockQuantity: 0,
          active: false, };
      }
    );
  }

  openAddProductModal(): void {
    const modal = document.getElementById('addProductModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    } else {
      console.error('Error: Add Product Modal element not found.');
    }
  }
  Addproduct(): void {
    if (this.newProduct.name) {
      this.productsService.createProduct(this.newProduct).subscribe(
        (newlyCreatedProduct: Product) => {
          this.products.push(newlyCreatedProduct);
          console.log('Product added successfully');
          this.newProduct = {
            name: '',
            shortDescription: '',
            longDescription: '',
            image: '',
            price: 0,
            categoryId: 0,
            subCategoryId: 0,
            stockQuantity: 0,
            active: false,
          }; // Réinitialiser newProduct pour un prochain ajout
          this.closeAddProductModal(); // Fermer le modal après l'ajout
          this.loadProductsWithPagiantion();
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Product name and price are required to add a product.');
    }
  }

  closeAddProductModal(): void {
    const modal = document.getElementById('addProductModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  openEditModal(productId: number): void {
    console.log('Open edit modal for product ID:', productId);
    this.productsService.getProductById(productId).subscribe(
      (product: Product) => {
        console.log('Product fetched:', product);
        this.editedProduct = { ...product };
        const modal = document.getElementById('editProductModal');
        if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
        }
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }


  closeEditProductModal(): void {
    const modal = document.getElementById('editProductModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }


  loadProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }


  saveProduct(): void {
    if (this.editedProduct) {
      this.productsService.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(
        () => {
          this.showSuccessUpdateAlert = true;
          this.loadProductsWithPagiantion();

          setTimeout(() => {
            this.showSuccessUpdateAlert = false;
          }, 2500);
          const modal = document.getElementById('editProductModal');
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
  loadProductsWithPagiantion() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;

      //this.loadProductsWithPagiantion();
      console.log("products loaded ",this.products);
      this.updatePaginatedProducts();

    })
  }
  onPageChange(): void {
    // Réagissez au changement de page
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }
  goToPage(page: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const totalPages = this.totalPages;
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }
  searchProducts(productName: string): void {
    this.productsService.searchProductsByName(productName).subscribe(
      (response: Product[]) => {
        console.log(response);
        this.paginatedProducts = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSearch(productName: string): void {
    if (productName.trim() === '') {
      this.resetPagination();
    } else {
      this.productsService.searchProductsByName(productName).subscribe(
        (response: Product[]) => {
          this.paginatedProducts = response;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  onSearchInputChange(value: string): void {
    if (value.trim() === '') {
      this.resetPagination();
    }
  }
  paginate(array: any[], page_size: number, page_number: number): any[] {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  resetPagination(): void {
    this.currentPage = 1;
    this.paginatedProducts = this.paginate(this.products, this.currentPage, this.pageSize);
  }

}
