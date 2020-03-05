export default {
  items: [
    {
      name: 'Home',
      url: '/stores/:store_id/',
      icon: 'icon-home',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Orders',
      url: '/stores/:store_id/orders',
      icon: 'icon-list',
    },
    {
      name: 'Products',
      url: '/stores/:store_id/products',
      icon: 'cui-fastfood',
    },
    {
      name: 'Tables',
      url: '/stores/:store_id/tables',
      icon: 'icon-pencil',
    },
    {
      name: 'Customers',
      url: '/stores/:store_id/customers',
      icon: 'icon-people',
    },
  ],
};
