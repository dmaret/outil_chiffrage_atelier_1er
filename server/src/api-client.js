// API Client for frontend - add this to index.html
class APIClient {
  constructor(baseURL = 'http://localhost:5000/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async request(method, endpoint, data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (this.token) {
      options.headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error.message);
      throw error;
    }
  }

  // Auth endpoints
  register(email, password, name) {
    return this.request('POST', '/auth/register', { email, password, name });
  }

  login(email, password) {
    return this.request('POST', '/auth/login', { email, password });
  }

  // Prestations endpoints
  getPrestations() {
    return this.request('GET', '/data/prestations');
  }

  createPrestation(prestation, client, montant) {
    return this.request('POST', '/data/prestations', { prestation, client, montant });
  }

  updatePrestation(id, prestation, client, montant) {
    return this.request('PUT', `/data/prestations/${id}`, { prestation, client, montant });
  }

  deletePrestation(id) {
    return this.request('DELETE', `/data/prestations/${id}`);
  }

  // Clinical records endpoints
  getClinicalRecords() {
    return this.request('GET', '/data/clinical');
  }

  saveClinicalRecord(clientId, data) {
    return this.request('POST', '/data/clinical', { client_id: clientId, data });
  }

  // Documents endpoints
  getDocuments() {
    return this.request('GET', '/data/documents');
  }

  uploadDocument(filename, data) {
    return this.request('POST', '/data/documents', { filename, data });
  }

  deleteDocument(id) {
    return this.request('DELETE', `/data/documents/${id}`);
  }
}

// Usage in index.html:
// const api = new APIClient('http://localhost:5000/api');
// const user = await api.login('email@example.com', 'password');
// api.setToken(user.token);
// const prestations = await api.getPrestations();
