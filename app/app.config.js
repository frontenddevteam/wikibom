angular.
module('wikibomApp').
config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/questionlist', {
        template: '<question-list></question-list>'
      }).
      when('/questionlist/:pageNumber', {
        template: '<question-list></question-list>'
      }).
      when('/questionform', {
        template: '<question-form></question-form>'
      }).
      when('/questionform/:questionId', {
        template: '<question-form></question-form>'
      }).
      when('/questionview/:questionId', {
        template: '<question-view></question-view>'
      }).
      when('/categoryform', {
        template: '<category-form></category-form>'
      }).
      otherwise({
        templateUrl : 'welcome/welcome.template.html'
      })
  }
]);