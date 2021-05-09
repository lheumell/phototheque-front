import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Product from "@/views/Product";
// import Post from "@/views/Post";
import Cart from "@/views/Cart";
import Layout from "@/views/Layout";
import Connexion from "@/views/Connexion";
import EditProduct from "@/views/EditProduct";
import ListProducts from "@/views/ListProducts";
import Profil from "@/views/Profil";
import Dashboard from "@/views/DashboardUser";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/",
          component: Home,
          name: "Home",
        },
        {
          path: "/product/:projectId",
          component: Product,
          name: "Product",
        },
        // {
        //   path: "/post",
        //   component: Post,
        //   name: "Post"
        // },
        {
          path: "/cart",
          component: Cart,
          name: "Cart",
        },
        {
          path: "/connexion",
          component: Connexion,
          name: "Connexion",
        },
        {
          path: "/edit-product",
          component: EditProduct,
          name: "EditProduct",
        },
        {
          path: "/list-products",
          component: ListProducts,
          name: "ListProducts",
        },
        {
          path: "/profil",
          component: Profil,
          name: "Profil",
        },
        {
          path: "/dashboard",
          component: Dashboard,
          name: "Dashboard",
        },
      ],
    },
  ],
  mode: "history",
});
