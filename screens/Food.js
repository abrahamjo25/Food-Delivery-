export const foods = [
  {
    id: "1",
    name: "Category 1",
    resturants: [
      {
        id: "101",
        image: require("../assets/images/pizza.png"),
        name: "Hotel App",
        rating: 4.5,
        description: "Description",
        dishes: [
          {
            id: "101",
            image: require("../assets/images/pizza.png"),
            name: "Cheese Burger",
            price: 350,
            description: "Description",
          },
          {
            id: "102",
            image: require("../assets/images/pizza.png"),
            name: "Cheese Burger",
            price: 350,
            description: "Description",
          },
        ],
        lng: "lng",
        lat: "lat",
      },
      {
        id: "102",
        image: require("../assets/images/pizza.png"),
        name: "Restaurant 2",
        rating: 4.2,
        description: "Description",
        dishes: [
          {
            id: "101",
            image: require("../assets/images/pizza.png"),
            name: "Cheese Burger",
            price: 350,
            description: "Description",
          },
          {
            id: "102",
            image: require("../assets/images/pizza.png"),
            name: "Egg Burger",
            price: 350,
            description: "Description",
          },
        ],
        lng: "lng",
        lat: "lat",
      },
    ],
    description: "Description for Category 1",
    type: "Featured Category 1",
  },
  {
    id: "2",
    name: "Category 2",
    resturants: [
      {
        id: "201",
        image: require("../assets/images/pizza.png"),
        name: "Restaurant 3",
        rating: 4.8,
        description: "Description",
        dishes: [
          {
            id: "101",
            image: require("../assets/images/pizza.png"),
            name: "Chees Burger",
            price: 350,
            description: "Description",
          },
          {
            id: "102",
            image: require("../assets/images/pizza.png"),
            name: "Egg Burger",
            price: 350,
            description: "Description",
          },
        ],
        lng: "lng",
        lat: "lat",
      },
    ],
    description: "Description for Category 2",
    type: "Featured Category 2",
  },
];

export default foods;
