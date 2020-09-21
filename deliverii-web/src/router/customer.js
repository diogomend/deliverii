import Home from "@/views/Customer/Home";
import RestaurantDetails from "@/views/Customer/RestaurantDetails";
import OrderConfirm from "@/views/Customer/OrderConfirm";
import OrderDetails from "@/views/Customer/OrderDetails";
import Orders from "@/views/Customer/Orders";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      user: "User"
    }
  },
  {
    path: "/restaurant/:id",
    name: "Restaurant Details Customer",
    component: RestaurantDetails,
    props: true,
    meta: {
      requiresAuth: true,
      user: "User"
    }
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    props: true,
    meta: {
      requiresAuth: true,
      user: "User"
    }
  },
  {
    path: "/orders/confirm",
    name: "Confirm Order",
    component: OrderConfirm,
    props: true,
    meta: {
      requiresAuth: true,
      user: "User"
    }
  },
  {
    path: "/order/:id",
    name: "Order Details Customer",
    component: OrderDetails,
    props: true,
    meta: {
      requiresAuth: true,
      user: "User"
    }
  }
];
