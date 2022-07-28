import http from '../http';

class AuthDataService {
  login(data) {
    return http.post(
      '/auth/login',
      JSON.stringify(data)
    );
  }
}

export default new AuthDataService;