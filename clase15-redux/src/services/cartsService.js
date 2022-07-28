import http from '../http';

class CartsDataService {
  getUserCarts(id) {
    return http.get(`/carts/user/${id}`);
  }
}

export default new CartsDataService;