
function config($stateProvider, $urlRouterProvider,$httpProvider) {

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
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'dashCtrl'
      }
    }
  })
  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'userCtrl'
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
  $urlRouterProvider.otherwise('/tab/login');
	$httpProvider.interceptors.push(function ($q, $location, global) {
		 return {
				 'request': function (config) {
						 config.headers = config.headers || {};
						 if (window.localStorage['token'] && config.url.indexOf(global.host) > -1){
								 config.headers.authorization = window.localStorage['token'];
						 }
						 return config;
				 },
				 'responseError': function (response) {
						 if (response.status === 401 || response.status === 403) {
								 $location.path('/login');
						 }
						 return $q.reject(response);
				 }
		 };
	});
};
