import AdminHome from "@/views/Admin/Home";
import Restaurants from "@/views/Admin/Restaurants";
import RestaurantDetails from "@/views/Admin/RestaurantDetails";
import RestaurantEdit from "@/views/Admin/RestaurantEdit";
import RestaurantCreate from "@/views/Admin/RestaurantCreate";
import MealDetails from "@/views/Admin/MealDetails";
import MealCreate from "@/views/Admin/MealCreate";
import Orders from "@/views/Admin/Orders";
import OrderDetails from "@/views/Admin/OrderDetails";

export default [
  {
    path: "/admin",
    name: "Deliverii Manager",
    component: AdminHome,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/restaurants",
    name: "Manager Restaurants",
    component: Restaurants,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/restaurants/create",
    name: "Restaurant Create",
    component: RestaurantCreate,
    props: true,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/restaurants/:id",
    name: "Restaurant Info",
    component: RestaurantDetails,
    props: true,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/restaurants/:id/edit",
    name: "Restaurant Edit",
    component: RestaurantEdit,
    props: true,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/restaurants/:restaurantID/meal/create",
    name: "Meal Create",
    component: MealCreate,
    props: true,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/restaurants/:restaurantID/meals/:mealID",
    name: "Meal Info",
    component: MealDetails,
    props: true,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/orders",
    name: "Manager Orders",
    component: Orders,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  },
  {
    path: "/admin/orders/:orderID",
    name: "Manager View Order",
    component: OrderDetails,
    props: true,
    meta: {
      requiresAuth: true,
      user: "Manager"
    }
  }
];
