(function() {

  var app = angular.module('estaine', ['shibuya.form.mailcheck']);

  app.controller('SignupCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.user = { email: '' };
      $scope.processing = false;
      $scope.attempted  = false;
      $scope.complete   = false;

      $scope.clearErrors = function() {
        $scope.attempted = false;
        $scope.responseError = null;
      };

      $scope.submit = function(event, url, listID) {
        event.preventDefault();
        $scope.attempted     = true;

        if ($scope.form.$valid) {
          $scope.processing    = true;
          $scope.responseError = null;

          var data = { list: listID, email: $scope.user.email };
          $http.post(url, data)
            .success(function() {
              $scope.complete = true;
            })
            .error(function(data) {
              $scope.responseError = data.msg;
              $scope.processing    = false;
            });
        }
      };

    }]);

})();
