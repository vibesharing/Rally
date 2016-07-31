function parcourService($http, global) {
  return {
    get: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/parcours/');
    },
    getById: function(id) {
      return $http.get('http://'+global.host+':'+global.port+'/api/parcours/' + id);
    },
    update: function(id, data) {
      return $http.put('http://'+global.host+':'+global.port+'/api/parcours/' + id, data);
    },
    createParcour: function(data) {
      return $http.post('http://'+global.host+':'+global.port+'/api/parcours', data);
    },
    delete: function(id) {
      return $http.delete('http://'+global.host+':'+global.port+'/api/parcours/' + id);
    }
  };
}
