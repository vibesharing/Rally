function userService($http,global) {
  return {
    get: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/users/');
    },
    getById: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/users/' + id);
    },
    update: function(id, data) {
      return $http.put('http://'+global.host+':'+global.port+'/api/users/' + id, data);
    },
    createUser: function(data) {
      return $http.post('http://'+global.host+':'+global.port+'/api/users', data);
    },
    delete: function(id) {
      return $http.delete('http://'+global.host+':'+global.port+'/api/users/' + id);
    },
    findOne: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/users/'+ id);
    },
  };
}
