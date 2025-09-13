export type UserRole = "farmer" | "consumer" | "retailer";

export type User = {
  user_name: string;
  user_email: string;
  user_role: UserRole | string;
  user_phone: string;
  user_loc: string;
  created_at: Date;
};
