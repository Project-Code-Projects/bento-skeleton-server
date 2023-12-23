/* export interface CategoriesInterface {
  id: Number;
  name: String;
}

export interface PackingInterface {
  dimensionLength: Number;
  dimensionWidth: Number;
  dimensionHeight: Number;
}

export interface AddOptionInterface {
  ingredientId: Number;
  ingredientName: String;
  quantity: Number;
  ingredient: POSIngredientInterface[];
}

export interface NoOptionInterface {
  ingredientId: Number;
  ingredientName: String;
  quantity: Number;
  ingredient: POSIngredientInterface[];
}

export interface POSIngredientInterface {
  id: Number;
  restaurantId: Number;
  ingredientName: String;
  unit: String;
  quantity: Number;
  costPerUnit: Number;
  caloriePerUnit: Number;
}

export interface ItemInterface {
  itemId: Number;
  itemName: String;
  itemQuantity: Number;
  itemImage: String; //newly included
  categoryId: Number;
  itemPreparationTime: Number;
  itemPackingType: String;
  itemPackingDimension: PackingInterface;
  ingredients: POSIngredientInterface[];
  options: {
    add: AddOptionInterface[];
    no: NoOptionInterface[];
  };
  optionalNotes: String;
}

export interface OrderItemInterface {
  restaurantId: Number;
  orderId: Number;
  categories: CategoriesInterface[];
  orderTime: Number;
  orderType: String; //inhouse or marketplace
  vipCustomer: Boolean;
  tableId: Number;
  items: ItemInterface[];
}
 */

const orderItems = {
  restaurantId: 5,
  orderId: 101,
  categories: [
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Main Course" },
    { id: 3, name: "Desserts" },
  ],
  orderTime: Date.now(),
  orderType: "inhouse",
  vipCustomer: false,
  tableId: 5,
  items: [
    {
      itemId: 1,
      itemName: "Margherita Pizza",
      itemQuantity: 2,
      itemImage: "pizza.jpg",
      categoryId: 1,
      itemPreparationtime: 15,
      itemPackingDimention: {
        dimensionLength: 10,
        dimensionWidth: 5,
        dimensionHeight: 3,
      },
      ingredients: [
        { id: 1, restaurantId: 5, ingredientName: "Tomato", unit: "gm", quantity: 200, costPerUnit: 1.5, caloriePerUnit: 2 },
        { id: 2, restaurantId: 5, ingredientName: "Chicken", unit: "gm", quantity: 300, costPerUnit: 5.0, caloriePerUnit: 15 },
        { id: 3, restaurantId: 5, ingredientName: "Cheese", unit: "gm", quantity: 450, costPerUnit: 3.0, caloriePerUnit: 22 },
      ],
      options: {
        add: [
          {
            ingredientId: 3,
            ingredientName: "Cheese",
            quantity: 1,
            ingredient: {
              id: 3,
              restaurantId: 5,
              ingredientName: "Cheese",
              unit: "gm",
              quantity: 450,
              costPerUnit: 3.0,
              caloriePerUnit: 22,
            },
          },
        ],
        no: [],
      },
      optionalNotes: "Extra spicy",
    },
    {
      itemId: 2,
      itemName: "Beef Burger",
      itemImage: "burger.jpg",
      categoryId: 2,
      itemPreparationtime: 12,
      itemPackingDimention: {
        dimensionLength: 8,
        dimensionWidth: 3,
        dimensionHeight: 3,
      },
      ingredients: [
        { id: 1, restaurantId: 5, ingredientName: "Tomato", unit: "gm", quantity: 20, costPerUnit: 1.5, caloriePerUnit: 2 },
        { id: 2, restaurantId: 5, ingredientName: "Beef Patty", unit: "gm", quantity: 200, costPerUnit: 4.0, caloriePerUnit: 20 },
        { id: 3, restaurantId: 5, ingredientName: "Cheese", unit: "gm", quantity: 50, costPerUnit: 3.0, caloriePerUnit: 22 },
      ],
      options: {
        add: [
          {
            ingredientId: 3,
            ingredientName: "Cheese",
            quantity: 1,
            ingredient: {
              id: 3,
              restaurantId: 5,
              ingredientName: "Cheese",
              unit: "gm",
              quantity: 50,
              costPerUnit: 3.0,
              caloriePerUnit: 22,
            },
          },
        ],
        no: [
          {
            ingredientId: 1,
            ingredientName: "Tomato",
            quantity: 1,
            ingredient: { id: 1, restaurantId: 5, ingredientName: "Tomato", unit: "gm", quantity: 20, costPerUnit: 1.5, caloriePerUnit: 2 },
          },
        ],
      },
      optionalNotes: "",
    },
  ],
};
