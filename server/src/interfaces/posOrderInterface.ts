interface CategoriesInterface {
  id: Number;
  name: String;
}

interface POSIngredientInterface {
  id: Number;
  restaurantId: Number;
  ingredientName: String;
  unit: String;
  quantity: Number;
  costPerUnit: Number;
  caloriePerUnit: Number;
}

interface PackingInterface {
  dimensionLength: Number;
  dimensionWidth: Number;
  dimensionHeight: Number;
}

interface AddOptionInterface {
  ingredientId: Number;
  ingredientName: String;
  quantity: Number;
  ingredient: POSIngredientInterface[];
}

interface NoOptionInterface {
  ingredientId: Number;
  ingredientName: String;
  quantity: Number;
  ingredient: POSIngredientInterface[];
}

interface ItemInterface {
  itemId: Number;
  itemName: String;
  itemImage: String; //newly included
  categoryId: Number;
  itemPreparationtime: Number;
  itemPackingDimention: PackingInterface;
  ingredients: [POSIngredientInterface];
  options: [{ add: AddOptionInterface[]; no: NoOptionInterface[] }];
  optionalNotes: String;
}

interface OrderItemInterface {
  restaurantId: Number;
  orderId: Number;
  categories: CategoriesInterface[];
  orderTime: Number;
  orderType: String; //inhouse or marketplace
  vipCustomer: Boolean;
  tableId: Number;
  items: ItemInterface[];
}
