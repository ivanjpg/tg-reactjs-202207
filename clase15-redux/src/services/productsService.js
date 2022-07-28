import http from '../http';

// Creamos una clase que sirva para organizar
// de manera adecuada (y encapsular) a las
// peticiones que realizamos con Axios.
// La ventaja es que ya tenemos a Axios
// configurado con URL base y los headers
// adecuados para hacer la petición
// como JSON.

class ProductsDataService {
  getAll() {
    return http.get('/products');
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post('/products/add', data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  search(q) {
    return http.get(`/products/search?q=${q}`);
  }
}

export default new ProductsDataService;