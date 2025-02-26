export interface UserInterface {
  id: string;
  name: string;
  email: string;
  restaurantId: number;
  role: "admin" | "employee";
  serviceAccess: string[];
}

