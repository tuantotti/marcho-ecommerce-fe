export interface IProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  urlImage: string;
  subImage: string[];
  priceOut: number;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  multipartFile: '';
  color: string;
  brand: string;
  size: string;
  countBuy: number;
  discount: string;
  categoryDto: {
    id: string;
    name: string;
  };
}

export interface IProductReview {
  postId: number;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  avatarPath: string;
  description: string;
  rating: number;
  id: number;
}
