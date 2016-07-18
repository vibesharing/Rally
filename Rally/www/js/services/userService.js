function userService($http) {
  return {
    get: function(id) {
      return $http.get('http://192.168.1.14:8000/api/users/');
    },
    getById: function(id) {
      return $http.get('http://192.168.1.14:8000/api/users/' + id);
    },
    update: function(id, data) {
      return $http.put('http://192.168.1.14:8000/api/users/' + id, data);
    },
    createParcour: function(data) {
      return $http.post('http://192.168.1.14:8000/api/users', data);
    },
    delete: function(id) {
      return $http.delete('http://192.168.1.14:8000/api/users/' + id);
    }
  };
}
