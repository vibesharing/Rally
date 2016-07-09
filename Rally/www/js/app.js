// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services'])
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'dashCtrl'
      }
    }
  })
  .state('tab.sous-theme', {
    url: '/sous-theme/:filter',
    views: {
      'tab-sous-theme': {
        templateUrl: 'templates/tab-sous-theme.html',
        controller: 'sousthemeCtrl'
      }
    }
  })
  .state('tab.list', {
    url: '/list/:filter',
    views: {
      'tab-list': {
        templateUrl: 'templates/tab-list.html',
        controller: 'listParcourCtrl'
      }
    }
  })
  .state('tab.description',{
    url:'/description/:parcourId',
    views: {
      'tab-description':{
        templateUrl: 'templates/tab-description.html',
        controller: 'parcourCtrl'
      }
    }
  })
  .state('tab.map',{
    url:'/map',
    views: {
      'tab-map':{
        templateUrl: 'templates/tab-map.html',
        controller: 'mapCtrl'
      }
    }
  })
  .state('tab.creationParcour',{
    url:'/creationParcour',
    views: {
      'tab-creationParcour':{
        templateUrl: 'templates/tab-creationParcour.html',
        controller: 'parcourCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
