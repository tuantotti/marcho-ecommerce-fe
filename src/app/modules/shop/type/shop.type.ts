export interface IProductColor {
  id: number;
  colorName: string;
  colorCode: string;
}
export interface IProductThumbnail {
  id: number;
  star: number;
  urlImages: string[];
  color: IProductColor;
}
export interface IProduct {
  id: string;
  brand: string;
  category: {
    id: number;
    name: string;
  };
  description: string;
  name: string;
  price: number;
  thumbnail: IProductThumbnail[];
}
export interface IGetProducts {
  page: number;
  size: number;
}
