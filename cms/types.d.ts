export interface Product {
  id: number;
  name: string;
  price: number;
  notes: string;
  category: Category;
  main_photo: string;
}

const enum Category {
  Jeans = 'jeans',
  Jacket = 'jacket',
  Newcategory = "new category",
  Polo = "polo",
}
