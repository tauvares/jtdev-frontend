'use strict';
angular.module('jtdev')
  .controller('NavegacaoController', ['$scope', '$state', '$location', '$rootScope', 'AuthService', 'ngDialog',
    function($scope, $state, $location, $rootScope, AuthService, ngDialog) {
      $scope.loggedIn = false;
      $scope.username = '';
      $scope.usuarioId = '';
      if (AuthService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthService.getUsername();
        $scope.usuarioId = AuthService.getUsuarioId();
      }
      $scope.openLogin = function() {
        ngDialog.open({
          template: 'views/login.html',
          scope: $scope,
          className: 'ngdialog-theme-default',
          controller: "LoginController"
        });
      };
      $scope.logOut = function() {
        AuthService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.usuarioId = '';
        $location.path('/');
      };
      $scope.openHome = function() {
        $state.go('app');
      };
      $scope.openMapa = function() {
        $state.go('app.mapa');
      };
      $scope.openUsuarios = function(usuarioId) {
        console.log(usuarioId);
        $state.go('app.usuarios', {id: usuarioId.usuarioId});
      };
      $scope.openFacilitadores = function(usuarioId) {
        console.log(usuarioId);
        $state.go('app.facilitadores-cadastro', {id: usuarioId.usuarioId});
      };
      $scope.openFacilitadoresPorEstado = function(estado) {
        $state.go('app.facilitadores', {uf: estado});
      };
      $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
        $scope.usuarioId = AuthService.getUsuarioId();
      });
      $rootScope.$on('registration:Successful', function() {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
        $scope.usuarioId = AuthService.getUsuarioId();
      });
      $scope.stateis = function(curstate) {
        return $state.is(curstate);
      };
    }
  ])
  .controller('LoginController', ['$scope', '$localStorage', 'AuthService', 'ngDialog', function($scope, $localStorage, AuthService, ngDialog) {
    $scope.loginData = $localStorage.getObject('userinfo', '{}');
    $scope.doLogin = function() {
      if ($scope.rememberMe)
        $localStorage.storeObject('userinfo', $scope.loginData);
      AuthService.login($scope.loginData);
      ngDialog.close();
    };
    $scope.abreRegistro = function() {
      ngDialog.open({
        template: 'views/registro.html',
        scope: $scope,
        className: 'ngdialog-theme-default',
        controller: "RegisterController"
      });
    };
  }])
  .controller('RegisterController', ['$scope', '$localStorage', 'AuthService', 'ngDialog', function($scope, $localStorage, AuthService, ngDialog) {
    $scope.register = {};
    $scope.loginData = {};
    $scope.doRegister = function() {
      AuthService.register($scope.registration);
      ngDialog.close();
    };
  }])

;
