import { create } from "zustand";
import axios from "axios";
import type { Product } from "../types/product";
import type { User } from "../types/user";


type ProductStore = {
  id: number;
  products: Product[];
  prod_categories: string[];
  prod_sellers: string[];
  locations: string[];
  users: User[];

  loadingProd: boolean;
  loadingCat: boolean;
  loadingSellers: boolean;
  loadingLoacations: boolean;
  loadingUsers: boolean;

  errorProd: string | null;
  errorCat: string | null;
  errorSellers: string | null;
  errorLocation: string | null;
  errorUsers: string | null;
  fetchUserDetails: (id : number) => Promise<void>;

  fetchProduct: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSellers: () => Promise<void>;
  fetchLocations: () => Promise<void>;
};

export const useFtm = create<ProductStore>((set) => ({
  id: 3,
  products: [],
  prod_categories: [],
  prod_sellers: [],
  orders: [],
  locations: [],
  users:[],

  loadingProd: false,
  loadingCat: false,
  loadingSellers: false,
  loadingProdbyfilters: false,
  loadingOrders: false,
  loadingLoacations: false,
  loadingUsers : false,

  errorProd: null,
  errorCat: null,
  errorSellers: null,
  errorProdbyfilters: null,
  errorOrders: null,
  errorLocation: null,
  errorUsers : null,

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

  fetchLocations: async () => {
    set({ loadingLoacations: true });
    try {
      const res = await axios.get(
        "http://localhost:3000/api/f2m/product/allLocations"
      );
      set({ locations: res.data, loadingLoacations: false });
    } catch (error: any) {
      set({ errorLocation: error.message, loadingLoacations: false });
    }
  },

  fetchUserDetails: async (id : number) => {
    set({ loadingUsers: true });
    try {
      const res = await axios.get(`http://localhost:3000/api/f2m/product/users/details/${id}`);
      set({ users: res.data.data, loadingUsers: false });
    } catch (error : any) {
      set({errorUsers : error.message, loadingUsers: false})
    }
  }
}));
