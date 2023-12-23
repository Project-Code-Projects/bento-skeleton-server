interface Menu {
  restaurantId: number;

  categories: {
    id: number;
    name: string;
  }[];

  items: {
    itemId: number;
    itemName: string;
    itemImage: string;
    itemDescription: string;
    itemPrice: number;
    itemCalories: number;
    categoryId: number;
    timeOfDay: string[];
    itemPortionSize: number;
    itemPreparationTime: number;
    itemLastingTime: number;
    itemPackingType: string;
    servingTemperature: number;
    itemDietaryRestrictions: {
      allergens: string;
    }[];

    itemPackingDimension: {
      dimensionLength: number;
      dimensionWidth: number;
      dimensionHeight: number;
    };

    ingredients: {
      id: number;
      restaurantId: number;
      ingredientName: string;
      unit: string;
      quantity: number;
      costPerUnit: number;
      caloriePerUnit: number;
    }[];

    options: {
      add: {
        ingredientName: string;
        quantity: number;
        ingredients: {
          id: number;
          restaurantId: number;
          ingredientName: string;
          unit: string;
          quantity: number;
          costPerUnit: number;
          caloriePerUnit: number;
        }[];
      }[];

      no: {
        ingredientName: string;
        quantity: number;
        ingredients: {
          id: number;
          restaurantId: number;
          ingredientName: string;
          unit: string;
          quantity: number;
          costPerUnit: number;
          caloriePerUnit: number;
        }[];
      }[];
    };
  }[];
}
