export interface CategoriesInterface {
  id: number;
  name: String;
}

export interface PackingInterface {
  dimensionLength: number;
  dimensionWidth: number;
  dimensionHeight: number;
}

export interface AddOptionInterface {
  ingredientId: number;
  ingredientName: String;
  ingredient: IngredientInterface;
}

export interface NoOptionInterface {
  ingredientId: number;
  ingredientName: String;
  ingredient: IngredientInterface;
}

export interface IngredientInterface {
  id: number;
  ingredientName: String;
  unit: String;
  quantity: number;
  costPerUnit: number;
  caloriePerUnit: number;
}

export interface ItemInterface {
  itemId: number;
  itemName: String;
  itemImage: String;
  categoryId: number;
  itemQuantity: number;
  itemPreparationTime: number;
  itemPackingType: String;
  itemPackingDimension: PackingInterface;
  itemServingTemperature: String;
  itemLastingTime?: number;
  itemPortionSize: number;
  ingredients: IngredientInterface[];
  options: { add: AddOptionInterface[]; no: NoOptionInterface[] };
  optionalNotes: String;
}

export interface OrderInterface {
  restaurantId: number;
  orderId: number;
  categories: CategoriesInterface[];
  orderTime: number;
  orderType: String;
  vipCustomer: Boolean;
  tableId?: number;
  deliveryServiceArriveTime?: number;
  items: ItemInterface[];
}


