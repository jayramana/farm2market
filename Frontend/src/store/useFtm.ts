import { create } from "zustand";
import axios from "axios";

type Product = {
  user_id: number;
  prod_id: number;
  prod_name: string;
  prod_category: string;
  prod_price: number;
  prod_quantity: number;
  prod_description: string;
  listed_at: Date;
};

type ProductStore = {
  products: Product[];
  prod_categories: string[];
  prod_sellers: string[];
  prod_by_name: Product[];

  loadingProd: boolean;
  loadingCat: boolean;
  loadingSellers: boolean;

  errorProd: string | null;
  errorCat: string | null;
  errorSellers: string | null;

  fetchProduct: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSellers: () => Promise<void>;
  fetchProdbyName: (name: string) => Promise<void>;
};

export const useFtm = create<ProductStore>((set) => ({
  products: [],
  prod_categories: [],
  prod_sellers: [],
  prod_by_name: [],
  loadingProd: false,
  loadingCat: false,
  loadingSellers: false,
  errorProd: null,
  errorCat: null,
  errorSellers: null,
  fetchProduct: async () => {
    try {
      set({ loadingProd: true });
      const res = await axios.get(
        "http://localhost:3000/api/f2m/product/getAll"
      );
      set({ products: res.data.data, loadingProd: false });
    } catch (error: any) {
      set({ errorProd: error.message, loadingProd: false });
    }
  },
  fetchCategories: async () => {
    try {
      set({ loadingCat: true });

      const res = await axios.get(
        "http://localhost:3000/api/f2m/product/allCategories"
      );
      set({ prod_categories: res.data.data, loadingCat: false });
    } catch (error: any) {
      set({ errorCat: error.message });
    }
  },
  fetchSellers: async () => {
    try {
      set({ loadingSellers: true });
      const res = await axios.get(
        "http://localhost:3000/api/f2m/product/allSellers"
      );
      set({ prod_sellers: res.data.data, loadingSellers: false });
    } catch (error: any) {
      set({ errorSellers: error.message, loadingSellers: false });
    }
  },
  fetchProdbyName: async (name: string) => {
    try {
      set({ loadingProd: true });
      const res = await axios.get(
        "http://localhost:3000/api/f2m/product/filterbyname",
        { params: { name } }
      );
      set({ prod_by_name: res.data.data,loadingProd : false});
    } catch (error: any) {
      set({ errorProd: error.message, loadingProd : false});
    }
  },
}));
