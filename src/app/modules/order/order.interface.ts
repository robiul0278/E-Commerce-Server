export interface IProduct {
    id: string;
    price: number;
    name: string;
    image: string;
    quantity: number;
    totalPrice: number;
}
export type TOrderData = {
    orderNumber: string;
    userName: string;
    phoneNumber: string;
    email: string;
    address: string;
    division: string;
    district: string;
    upazilla: string;
    postalCode: string;
    products: IProduct[];
    totalProduct: number;
    totalPayment: number;
    userId: string;
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
    payment: "Pending" | "Success" ;
    createdAt?: Date;
    updatedAt?: Date; 
};

