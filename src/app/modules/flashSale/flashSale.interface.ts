export type TFlashProduct = {
    name: string;
    price: number;
    brand: string;
    category: string;
    sub_category: string;
    stock: number;
    image: string;
    description: string;
  }
  
 export type TFlashData = {
    name: string;
    role: "admin";
    discount: number;
    products: TFlashProduct[];
    startTime: string | Date;
    endTime: string | Date;
    status: "pending" | "approved" | "rejected";
  }

  export type TUpdateFlashData = {
    id: string;
    discount: number;
    startTime: string | Date,
    endTime: string | Date,
  }