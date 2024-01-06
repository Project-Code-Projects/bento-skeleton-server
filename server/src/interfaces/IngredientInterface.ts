interface IngredientInterface {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  currentStockQuantity: number;
  unitOfPrice: string;
  purchasePrice: number;
  costPerUnit: number;
  caloriesPerUnit: number;
  expirationDate: Date;
  reorderPoint: number;
  description: string;
  unitOfIdealStoringTemperature: string;
  idealStoringTemperature: number;
  expectedStockForToday: null | any;
  expectedStockForTomorrow: null | any;
  restaurantId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IngredientResultInterface {
  ingredients: IngredientInterface[];
}
