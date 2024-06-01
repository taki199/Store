// types/index.ts

export interface Dish {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  image: {
    url: string;
    publicId: string;
  };
  quantity: number;
  stock: number;
  tags: string[];
  ingredients: string[];
  ratings: any[];
  relatedDishes: any[];
  availabilitySchedule: {
    startTime: string;
    endTime: string;
  };
  isDeleted: boolean;
  __v: number;
  slug: string;
  id:string |null
}

export interface ProfilePhoto {
  url: string;
  publicId: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePhoto: ProfilePhoto;
  IsDeleted: boolean;
  isCustomer: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  dishId: Dish;
  quantity: number;
  _id: string;
  id: string;
}

export interface Order {
  _id: string;
  customer: User;
  orderItems: OrderItem[];
  totalAmount: number;
  orderStatus: string;
  shippingAddress: string;
  paymentMethod: string;
  deliveryDate: string;
  IsDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  formattedCreatedAt: string;
  id: string;
}

export interface OrderResponse {
  message: string;
  orders: Order[];
}

export interface Category {
  _id: string;
  name: string;
  image: {
    url: string;
    publicId: string;
  };
}
