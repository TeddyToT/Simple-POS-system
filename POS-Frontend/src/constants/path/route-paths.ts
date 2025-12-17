export default {
  app: {
    path: '/',
    // Main
    main: {
      path: '/',
      product: {
        path: 'san-pham'
      },
      order: {
        path: 'don-hang',
        orderDetail: {
          path: ':id'
        }
      },
    },
  }
}
