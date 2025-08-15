export type Product = {
  user_id: number;
  prod_id: number;
  prod_name: string;
  prod_category: string;
  prod_price: number;
  prod_quantity: number;
  prod_description: string;
  listed_at: Date;
  Seller_name: string;
  Buyer_name: string;
  prod_loc: string;
};

export type hashMap = {
  [key: number]: Array<Product & { selected_quantity: number, final_price : number }>
}

