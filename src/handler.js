const mysql = require('mysql');


// Konfigurasi koneksi ke database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username', // Ganti dengan username MySQL
  password: 'password', // Ganti dengan password MySQL
  database: 'dbname', // Ganti dengan nama database
});

// Fungsi untuk menjalankan query ke database
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getProducts = async (request, h) => {
  try {
    // Query untuk mendapatkan semua produk dari database
    const results = await query('SELECT * FROM produk');
    return { products: results };
  } catch (error) {
    console.error('Error fetching products:', error);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const getProductById = async (request, h) => {
  const { id } = request.params;
  try {
    // Query untuk mendapatkan produk berdasarkan ID dari database
    const results = await query('SELECT * FROM produk WHERE id_produk = ?', [id]);
    if (results.length === 0) {
      return h.response({ message: 'Product not found' }).code(404);
    }
    return { product: results[0] };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const createProduct = async (request, h) => {
  const { produk_name, produk_description, produk_price } = request.payload;
  try {
    // Query untuk menambahkan produk ke database
    const results = await query(
      'INSERT INTO produk (produk_name, produk_description, produk_price) VALUES (?, ?, ?)',
      [produk_name, produk_description, produk_price]
    );
    const productId = results.insertId;
    return h.response({ message: 'Product created', id: productId }).code(201);
  } catch (error) {
    console.error('Error creating product:', error);
    return h.response({ message: 'Failed to create product' }).code(500);
  }
};

const updateProduct = async (request, h) => {
  const { id } = request.params;
  const { produk_name, produk_description, produk_price } = request.payload;
  try {
    // Query untuk mengupdate produk di database
    await query(
      'UPDATE produk SET produk_name = ?, produk_description = ?, produk_price = ? WHERE id_produk = ?',
      [produk_name, produk_description, produk_price, id]
    );
    return h.response({ message: 'Product updated' });
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    return h.response({ message: 'Failed to update product' }).code(500);
  }
};

const deleteProduct = async (request, h) => {
  const { id } = request.params;
  try {
    // Query untuk menghapus produk dari database
    await query('DELETE FROM produk WHERE id_produk = ?', [id]);
    return h.response({ message: 'Product deleted' });
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    return h.response({ message: 'Failed to delete product' }).code(500);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
