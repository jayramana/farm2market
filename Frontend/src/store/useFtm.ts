import { create } from "zustand";
import axios from "axios";
import type { Product } from "../types/product";
import type { User } from "../types/user";
import type { Orders } from "../types/transactions";

type ProductStore = {
  id: number;
  products: Product[];
  prod_categories: string[];
  prod_sellers: string[];
  locations: string[];
  users: User;
  orders: Orders[];
  currView: number;
  currCat: string;
  currSeller: string;

  loadingProd: boolean;
  loadingCat: boolean;
  loadingSellers: boolean;
  loadingLoacations: boolean;
  loadingUsers: boolean;
  loadingOrders: boolean;

  errorProd: string | null;
  errorCat: string | null;
  errorSellers: string | null;
  errorLocation: string | null;
  errorUsers: string | null;
  errorOrders: string | null;

  fetchProduct: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSellers: () => Promise<void>;
  fetchLocations: () => Promise<void>;
  fetchUserDetails: (id: number) => Promise<void>;
  fetchOrder: (id: number) => Promise<void>;
  changeCurrProd: (id: number) => void;
  fetchCat: (name: string) => void;
  fetchSeller: (name: string) => void;
};

export const useFtm = create<ProductStore>((set) => ({
  id: 2,
  products: [],
  prod_categories: [],
  prod_sellers: [],
  orders: [],
  locations: [],
  users: {
    user_name: "",
    user_email: "",
    user_phone: "",
    user_loc: "",
    created_at: new Date(),
  },
  currView: -1,
  currCat: "",
  currSeller: "",

  loadingProd: false,
  loadingCat: false,
  loadingSellers: false,
  loadingProdbyfilters: false,
  loadingOrders: false,
  loadingLoacations: false,
  loadingUsers: false,

  errorProd: null,
  errorCat: null,
  errorSellers: null,
  errorProdbyfilters: null,
  errorOrders: null,
  errorLocation: null,
  errorUsers: null,

  changeCurrProd: (id: number) => {
    set({ currView: id });
  },
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

  fetchUserDetails: async (id: number) => {
    set({ loadingUsers: true });
    try {
      const res = await axios.get(
        `http://localhost:3000/api/f2m/product/users/details/${id}`
      );
      set({ users: res.data.data, loadingUsers: false });
    } catch (error: any) {
      set({ errorUsers: error.message, loadingUsers: false });
    }
  },

  fetchOrder: async (id: number) => {
    set({ loadingOrders: true });
    try {
      const res = await axios.get(
        `http://localhost:3000/api/f2m/product/user/orders/${id}`
      );
      set({ orders: res.data, loadingOrders: false });
    } catch (error: any) {
      set({ errorOrders: error.message, loadingOrders: false });
    }
  },
  fetchCat: (name: string) => {
      set({ currCat: name });
  },
  fetchSeller: (name: string) => {
      set({ currSeller: name });
  },
}));
