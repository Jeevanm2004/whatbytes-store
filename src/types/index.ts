export interface Review {
  id: number;
  name: string;
  rating: number;
  title: string;
  body: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  rating: number;
  description: string;
  reviews?: Review[];
}
