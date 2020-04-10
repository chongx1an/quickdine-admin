export default {
  items: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'icon-home',
    },
    {
      name: 'Orders',
      url: '/orders',
      icon: 'icon-list',
    },
    {
      name: 'Products',
      icon: 'cil-fastfood',
      children: [
        {
          name: 'All Products',
          url: '/products'
        },
        {
          name: 'Collections',
          url: '/collections'
        },
      ]
    },
    {
      name: 'Tables',
      url: '/tables',
      icon: 'icon-pencil',
    },
    {
      name: 'Customers',
      url: '/customers',
      icon: 'icon-people',
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-settings',
    },
  ],
};
