export interface IProduct {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  priceOut?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  urlImage?: string;
  subImage?: string[];
  rating?: number;
  multipartFile?: string;
  color?: string;
  brand?: string;
  size?: string;
  countBuy?: number;
  discount?: string;
  categoryDto?: {
    id?: number;
    name?: string;
  };
}
