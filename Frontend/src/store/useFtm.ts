import { create } from "zustand";
import axios from "axios";
import type { Product } from "../types/product";
import type { Orders } from "../types/transactions";

// type Product = {
//   user_id: number;
//   prod_id: number;
//   prod_name: string;
//   prod_category: string;
//   prod_price: number;
//   prod_quantity: number;
//   prod_description: string;
//   listed_at: Date;
// };

type ProductStore = {
  id: number;
  products: Product[];
  prod_categories: string[];
  prod_sellers: string[];
  prod_by_filters: Product[];
  orders: Orders[];

  loadingProd: boolean;
  loadingCat: boolean;
  loadingSellers: boolean;
  loadingProdbyfilters: boolean;
  loadingOrders: boolean;

  errorProd: string | null;
  errorCat: string | null;
  errorSellers: string | null;
  errorProdbyfilters: string | null;
  errorOrders: string | null;

  fetchProduct: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSellers: () => Promise<void>;
  fetchProdbyfilters: (
    name: string,
    loc: string,
    price: string
  ) => Promise<void>;
  fetchOrders: (id: number) => Promise<void>;
};

export const useFtm = create<ProductStore>((set) => ({
  id: -1,
  products: [],
  prod_categories: [],
  prod_sellers: [],
  prod_by_filters: [],
  orders: [],

  loadingProd: false,
  loadingCat: false,
  loadingSellers: false,
  loadingProdbyfilters: false,
  loadingOrders: false,

  errorProd: null,
  errorCat: null,
  errorSellers: null,
  errorProdbyfilters: null,
  errorOrders: null,

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

  fetchProdbyfilters: async (name, loc, price) => {
    try {
      set({ loadingProdbyfilters: true });
      const res = await axios.get(
        "http://localhost:3000/api/f2m/product/filterby",
        { params: { name, loc, price } }
      );
      set({ prod_by_filters: res.data.data, loadingProdbyfilters: false });
    } catch (error: any) {
      set({ loadingProdbyfilters: false, errorProdbyfilters: error.message });
    }
  },
  fetchOrders: async (id) => {
    set({ loadingOrders: true });
    try {
      const res = await axios(
        `http://localhost:3000/api/f2m/product/user/orders/${id}`
      );
      set({ orders: res.data.data, loadingOrders: false });
    } catch (error: any) {
      set({ loadingOrders: false, errorOrders: error.message });
    }
  },
}));
