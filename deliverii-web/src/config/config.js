export const FOOD_TYPES = [
  "American",
  "Burgers",
  "Indian",
  "Italian",
  "Japanese",
  "Portuguese",
  "Street Food"
];

export const ORDER_STATUS = [
  { status: "Placed", user: "user" },
  { status: "Canceled", user: "user" },
  { status: "Processing", user: "manager" },
  { status: "In Route", user: "manager" },
  { status: "Delivered", user: "manager" },
  { status: "Received", user: "user" }
];

export const GET_NEXT_STATE = currentState => {
  if (currentState == "Canceled") {
    return false;
  }

  if (currentState == "Placed") {
    return ORDER_STATUS[2];
  }
  
  for (const [idx, status] of ORDER_STATUS.entries()) {
    if (status.status == currentState && idx < ORDER_STATUS.length - 1) {
      return ORDER_STATUS[idx + 1];
    }
  }

  return false;
};

export const ADMIN_DRAWER = [
  {
    icon: "mdi-home",
    title: "Home",
    to: "/admin/"
  },
  {
    icon: "mdi-store",
    title: "Restaurants",
    to: "/admin/restaurants"
  },
  {
    icon: "mdi-food-variant",
    title: "Orders",
    to: "/admin/orders"
  }
];

export const USER_DRAWER = [
  {
    icon: "mdi-store",
    title: "Restaurants",
    to: "/"
  },
  {
    icon: "mdi-food-variant",
    title: "Orders",
    to: "/orders"
  }
];
