import React from "react";

// const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
// const Cards = React.lazy(() => import("./views/Base/Cards"));
// const Carousels = React.lazy(() => import("./views/Base/Carousels"));
// const Collapses = React.lazy(() => import("./views/Base/Collapses"));
// const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));
// const Forms = React.lazy(() => import("./views/Base/Forms"));
// const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
// const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
// const Navbars = React.lazy(() => import("./views/Base/Navbars"));
// const Navs = React.lazy(() => import("./views/Base/Navs"));
// const Paginations = React.lazy(() => import("./views/Base/Paginations"));
// const Popovers = React.lazy(() => import("./views/Base/Popovers"));
// const ProgressBar = React.lazy(() => import("./views/Base/ProgressBar"));
// const Switches = React.lazy(() => import("./views/Base/Switches"));
// // const Tables = React.lazy(() => import('./views/Base/Tables'));
// const Tabs = React.lazy(() => import("./views/Base/Tabs"));
// const Tooltips = React.lazy(() => import("./views/Base/Tooltips"));
// const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
// const ButtonDropdowns = React.lazy(() =>
//   import("./views/Buttons/ButtonDropdowns")
// );
// const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
// const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));
// const Charts = React.lazy(() => import("./views/Charts"));

// const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
// const Flags = React.lazy(() => import("./views/Icons/Flags"));
// const FontAwesome = React.lazy(() => import("./views/Icons/FontAwesome"));
// const SimpleLineIcons = React.lazy(() =>
//   import("./views/Icons/SimpleLineIcons")
// );
// const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
// const Badges = React.lazy(() => import("./views/Notifications/Badges"));
// const Modals = React.lazy(() => import("./views/Notifications/Modals"));
// const Colors = React.lazy(() => import("./views/Theme/Colors"));
// const Typography = React.lazy(() => import("./views/Theme/Typography"));
// const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
// const Users = React.lazy(() => import("./views/Users/Users"));
// const User = React.lazy(() => import("./views/Users/User"));

const Dashboard = React.lazy(() => import("./views/Dashboard"));

// Orders
const Orders = React.lazy(() => import("./views/Orders/Orders"));
const RetrieveOrder = React.lazy(() =>
  import("./views/Orders/RetrieveOrder/RetrieveOrder")
);

// Products
const Products = React.lazy(() => import("./views/Products/Products"));
const EditProduct = React.lazy(() =>
  import("./views/Products/EditProduct/EditProduct")
);

// Collections
const Collections = React.lazy(() => import("./views/Collections/Collections"));
const EditCollection = React.lazy(() =>
  import("./views/Collections/EditCollection/EditCollection")
);

// Tables
const Tables = React.lazy(() => import("./views/Tables/Tables"));
const CreateTable = React.lazy(() =>
  import("./views/Tables/CreateTable/CreateTable")
);
const TableOrders = React.lazy(() =>
  import("./views/Tables/TableOrders/TableOrders")
);

// Customers
const Customers = React.lazy(() => import("./views/Customers/Customers"));
const RetrieveCustomer = React.lazy(() =>
  import("./views/Customers/RetrieveCustomer/RetrieveCustomer")
);

// Settings
const Settings = React.lazy(() => import("./views/Settings/Settings"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  // Orders
  { path: "/orders/:order_id", name: "Order Detail", component: RetrieveOrder },
  { path: "/orders", name: "Orders", component: Orders },

  // Products
  {
    path: "/products/:product_id",
    name: "Edit Product",
    component: EditProduct
  },
  { path: "/products", name: "Products", component: Products },

  // Collections
  {
    path: "/collections/:collection_id",
    name: "Edit Collection",
    component: EditCollection
  },
  { path: "/collections", name: "Collections", component: Collections },

  // Tables
  { path: "/tables/new", name: "Add Table", component: CreateTable },
  { path: "/tables/:table_id", name: "Orders", component: TableOrders },
  { path: "/tables", name: "Tables", component: Tables },

  // Customers
  {
    path: "/customers/:customer_id",
    name: "Customer profile",
    component: RetrieveCustomer
  },
  { path: "/customers", name: "Customers", component: Customers },

  // Settings
  { path: "/settings", name: "Settings", component: Settings }
];

export default routes;
