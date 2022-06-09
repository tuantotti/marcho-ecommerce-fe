export interface ISize {
  id: number;
  name: string;
}
export interface ISizes {
  id: number;
  quantity: number;
  size: ISize;
}
export interface IColor {
  id: number;
  colorName: string;
  colorCode: string;
}
export interface IColors {
  id: number;
  start: number;
  urlImages: string[];
  color: IColor;
  sizes: ISizes[];
}

export interface ICategory {
  id: string;
  name: string;
  parentId: string;
  displayOrder: number;
}
export interface IProduct {
  id?: string;
  name?: string;
  brand?: string;
  priceOut?: number;
  description?: string;
  totalQuantity: number;
  colors: IColors[];
  category: ICategory;
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
