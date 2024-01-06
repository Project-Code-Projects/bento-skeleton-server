// interface Menu {
//   restaurantId: number;

//   categories: {
//     id: number;
//     name: string;
//   }[];

//   items: {
//     itemId: number;
//     itemName: string;
//     itemImage: string;
//     itemDescription: string;
//     itemPrice: number;
//     itemCalories: number;
//     categoryId: number;
//     timeOfDay: string[];
//     itemPortionSize: number;
//     itemPreparationTime: number;
//     itemLastingTime: number;
//     itemPackingType: string;
//     servingTemperature: number;
//     itemDietaryRestrictions: {
//       allergens: string;
//     }[];

//     itemPackingDimension: {
//       dimensionLength: number;
//       dimensionWidth: number;
//       dimensionHeight: number;
//     };

//     ingredients: {
//       id: number;
//       restaurantId: number;
//       ingredientName: string;
//       unit: string;
//       quantity: number;
//       costPerUnit: number;
//       caloriePerUnit: number;
//     }[];

//     options: {
//       add: {
//         ingredientName: string;
//         quantity: number;
//         ingredients: {
//           id: number;
//           restaurantId: number;
//           ingredientName: string;
//           unit: string;
//           quantity: number;
//           costPerUnit: number;
//           caloriePerUnit: number;
//         }[];
//       }[];

//       no: {
//         ingredientName: string;
//         quantity: number;
//         ingredients: {
//           id: number;
//           restaurantId: number;
//           ingredientName: string;
//           unit: string;
//           quantity: number;
//           costPerUnit: number;
//           caloriePerUnit: number;
//         }[];
//       }[];
//     };
//   }[];
// }



// -----------------------------------


let data = {
              _id: "65956082863bffbcdd261c2a",
              restaurantId: 1,
              categoryId: 1,
              mealTimeId: 1,
              item: {
                  itemName: "Sipder Burger",
                  itemImage: "burgerImage1.png",
                  itemDescription: "Good deal",
                  itemPrice: 20,
                  itemCalories: 400,
                  timeOfDay: [
                      "BreakFast",
                      "Lunch"
                    ],
                  itemProfileTastyTags: [
                      "Spicy",
                      "Hot"
                    ],
                  itemPortionsize: 1,
                  itemPreparationtime: 10,
                  itemLastingTime: 40,
                  itemPackingType: "Box",
                  servingTemperature: 30,
                  itemDietaryRestrictions: [
                        {
                          allergens: "eggs",
                          _id: "65956082863bffbcdd261c2c"
                        },
                        {
                          allergens: "milk",
                          _id: "65956082863bffbcdd261c2d"
                        }
                    ],
                  itemPackingDimention: {
                      dimensionLength: 6,
                      dimensionWidth: 6,
                      dimensionHeight: 5,
                      _id: "65956082863bffbcdd261c2e"
                    },
                  ingredients: [
                        {
                          id: 9,
                          restaurantId: 1,
                          ingredientName: "Ground Beef",
                          unitOfStock: "gm",
                          quantity: 200,
                          costPerUnit: 0.599,
                          caloriesPerUnit: 150,
                          _id: "65956082863bffbcdd261c2f"
                        },
                        {
                          id: 10,
                          restaurantId: 1,
                          ingredientName: "Burger Bun",
                          unitOfStock: "piece",
                          quantity: 200,
                          costPerUnit: 0.995,
                          caloriesPerUnit: 120,
                          _id: "65956082863bffbcdd261c30"
                        },
                        {
                          id: 11,
                          restaurantId: 1,
                          ingredientName: "Lettuce",
                          unitOfStock: "gm",
                          quantity: 20,
                          costPerUnit: 0.298,
                          caloriesPerUnit: 5,
                          _id: "65956082863bffbcdd261c31"
                        },
                        {
                          id: 12,
                          restaurantId: 1,
                          ingredientName: "Tomato",
                          unitOfStock: "gm",
                          quantity: 20,
                          costPerUnit: 0.83,
                          caloriesPerUnit: 20,
                          _id: "65956082863bffbcdd261c32"
                        },
                        {
                          id: 13,
                          restaurantId: 1,
                          ingredientName: "Cheese Slice",
                          unitOfStock: "piece",
                          quantity: 30,
                          costPerUnit: 2.99,
                          caloriesPerUnit: 80,
                          _id: "65956082863bffbcdd261c33"
                        },
                        {
                          id: 14,
                          restaurantId: 1,
                          ingredientName: "Onion",
                          unitOfStock: "gm",
                          quantity: 20,
                          costPerUnit: 0.456,
                          caloriesPerUnit: 10,
                          _id: "65956082863bffbcdd261c34"
                        },
                        {
                          id: 15,
                          restaurantId: 1,
                          ingredientName: "Ketchup",
                          unitOfStock: "ml",
                          quantity: 10,
                          costPerUnit: 0.52666,
                          caloriesPerUnit: 15,
                          _id: "65956082863bffbcdd261c35"
                        },
                        {
                          id: 16,
                          restaurantId: 1,
                          ingredientName: "Mustard",
                          unitOfStock: "ml",
                          quantity: 15,
                          costPerUnit: 0.89,
                          caloriesPerUnit: 10,
                          _id: "65956082863bffbcdd261c36"
                        }
                    ],
                  options: {
                      add: [
                            {
                              ingredientName: "Cheese Slice",
                              quantity: 0,
                              ingredients: [
                                    {
                                      id: 13,
                                      restaurantId: 1,
                                      ingredientName: "Cheese Slice",
                                      unitOfStock: "piece",
                                      quantity: 30,
                                      costPerUnit: 2.99,
                                      caloriesPerUnit: 80,
                                      _id: "65956082863bffbcdd261c38"
                                    }
                                ],
                              _id: "65956082863bffbcdd261c37"
                            },
                            {
                              ingredientName: "Onion",
                              quantity: 0,
                              ingredients: [
                                    {
                                      id: 14,
                                      restaurantId: 1,
                                      ingredientName: "Onion",
                                      unitOfStock: "gm",
                                      quantity: 20,
                                      costPerUnit: 0.456,
                                      caloriesPerUnit: 10,
                                      _id: "65956082863bffbcdd261c3a"
                                    }
                                ],
                              _id: "65956082863bffbcdd261c39"
                            }
                        ],
                      no: [
                            {
                              ingredientName: "Cheese Slice",
                              quantity: 0,
                              ingredients: [
                                    {
                                      id: 13,
                                      restaurantId: 1,
                                      ingredientName: "Cheese Slice",
                                      unitOfStock: "piece",
                                      quantity: 30,
                                      costPerUnit: 2.99,
                                      caloriesPerUnit: 80,
                                      _id: "65956082863bffbcdd261c3c"
                                    }
                                ],
                              _id: "65956082863bffbcdd261c3b"
                            },
                            {
                              ingredientName: "Onion",
                              quantity: 0,
                              ingredients: [
                                    {
                                      id: 14,
                                      restaurantId: 1,
                                      ingredientName: "Onion",
                                      unitOfStock: "gm",
                                      quantity: 20,
                                      costPerUnit: 0.456,
                                      caloriesPerUnit: 10,
                                      _id: "65956082863bffbcdd261c3e"
                                    }
                                ],
                              _id: "65956082863bffbcdd261c3d"
                            }
                        ]
                    },
                  _id: "65956082863bffbcdd261c2b",
                  itemId: 9
                },
              __v: 0
            }
