function POIService(){
  return {
    get: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/pois/');
    },
    getById: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/pois/' + id);
    },
    update: function(id, data) {
      return $http.put('http://'+global.host+':'+global.port+'/api/pois/' + id, data);
    },
    createUser: function(data) {
      return $http.post('http://'+global.host+':'+global.port+'/api/pois', data);
    },
    delete: function(id) {
      return $http.delete('http://'+global.host+':'+global.port+'/api/pois/' + id);
    },
    findOne: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/pois/'+ id);
    },
  };  
}
