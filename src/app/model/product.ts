export interface Product{
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  price: number;
  categoryId: number,
  subCategoryId: number,
  stockQuantity: number;
  active: boolean;

}
