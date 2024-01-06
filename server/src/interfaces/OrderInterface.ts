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
  //restaurantId: number;
  ingredientName: String;
  unit: String;
  quantity: number;
  costPerUnit: number;
  caloriePerUnit: number;
}

export interface ItemInterface {
  itemId: number;
  itemName: String;
  itemImage: String; //newly included
  categoryId: number;
  itemQuantity: number; //newly added -----------------------------------------------
  itemPreparationTime: number; //time in caps
  itemPackingType: String;
  itemPackingDimension: PackingInterface; //spelling mistake
  itemServingTemperature: String; //needed for both marketplace and inhouse
  itemLastingTime?: number; //needed for marketplace
  itemPortionSize: number; //needed for both marketplace and inhouse
  ingredients: IngredientInterface[]; // -------------------------------------------------
  options: { add: AddOptionInterface[]; no: NoOptionInterface[] }; //------------------------
  optionalNotes: String;
}

export interface OrderInterface {
  restaurantId: number;
  orderId: number;
  categories: CategoriesInterface[];
  orderTime: number;
  orderType: String; //inhouse or marketplace
  vipCustomer: Boolean;
  tableId?: number; //only for inhouse
  deliveryServiceArriveTime?: number; //only for marketplace, in minutes
  items: ItemInterface[]; // -----------------------------------
}

// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------

const orderItems = {
  restaurantId: 5,
  orderId: 101,
  categories: [
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Main Course" },
    { id: 3, name: "Desserts" },
  ],
  orderTime: "12.00.55",
  orderType: "inhouse",
  vipCustomer: false,
  tableId: 5, // Only for POS
  deliveryServiceArriveTime: 15, //only for marketplace, in minutes
  items: [
    {
      itemId: 1,
      itemName: "Margherita Pizza",
      itemImage: "pizza.jpg",
      categoryId: 1,
      itemQuantity: 2, // $$$$$$$$$$$$$$$$$
      itemPreparationTime: 15,
      itemPackingType: "Round Box",
      itemPackingDimension: {
        dimensionLength: 10,
        dimensionWidth: 5,
        dimensionHeight: 3,
      },
      itemServingTemperature: "32 celsius", //needed for both marketplace and inhouse
      itemLastingTime: 50, //needed for marketplace
      itemPortionSize: 4, //needed for both marketplace and inhouse
      ingredients: [
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // restaurantId maybe thakbe na
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
      itemQuantity: 2,
      itemPreparationTime: 12,
      itemPackingType: "Round Box",
      itemPackingDimension: {
        dimensionLength: 8,
        dimensionWidth: 3,
        dimensionHeight: 3,
      },
      itemServingTemperature: "32 celsius", //needed for both marketplace and inhouse
      itemLastingTime: "50", //needed for marketplace
      itemPortionSize: 4, //needed for both marketplace and inhouse
      ingredients: [
        { id: 1, restaurantId: 5, ingredientName: "Tomato", unit: "gm", quantity: 20, costPerUnit: 1.5, caloriePerUnit: 2 },
        { id: 4, restaurantId: 5, ingredientName: "Beef Patty", unit: "gm", quantity: 200, costPerUnit: 4.0, caloriePerUnit: 20 },
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
