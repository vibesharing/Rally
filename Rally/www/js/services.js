angular.module('starter.services', [])

.service('parcourService', function($http) {
  return {
    getById: function(id) {
      return $http.get('http://localhost/api/parcours/' + id);
    },
    update: function(id, data) {
      return $http.put('http://localhost/api/parcours/' + id, data);
    },
    createParcour: function(data) {
      return $http.post('http://localhost/api/parcours', data);
    },
    delete: function(id) {
      return $http.delete('http://localhost/api/parcours/' + id);
    }
  };
});
