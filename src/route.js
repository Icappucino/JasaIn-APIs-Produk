const handler = require('./handlers');

const routes = [
  {
    method: 'GET',
    path: '/products',
    handler: handler.getProducts,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: handler.getProductById,
  },
  {
    method: 'POST',
    path: '/products',
    handler: handler.createProduct,
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: handler.updateProduct,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: handler.deleteProduct,
  },
];

module.exports = routes;
