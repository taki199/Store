// types.ts
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
    quantity:number;
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
  }
  