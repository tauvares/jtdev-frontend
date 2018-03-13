'use strict';
angular.module('jtdev')
.controller('UsuariosController', ['$scope', 'Usuario', '$stateParams', '$state', 'ngDialog',
  function($scope, Usuario, $stateParams, $state, ngDialog) {
    $scope.showUsuarios = false;
    $scope.message = "Loading ...";
    $scope.usuario = Usuario.findById({id: $stateParams.id})
      .$promise.then(
        function(response) {
          $scope.usuario = response;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );
    $scope.editUsuario = function(usuario){
      $scope.usuario = usuario;
    };
    $scope.usuarios = Usuario.find()
      .$promise.then(
        function(response) {
          $scope.usuarios = response;
          $scope.showUsuarios = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    $scope.saveUsuario = function() {
      Usuario.prototype$updateAttributes({
        id: $scope.usuario.id,
        userName: $scope.usuario.userName,
        email: $scope.usuario.email,
        nome: $scope.usuario.nome,
        telefone: $scope.usuario.telefone,
        foto: $scope.usuario.foto
      })
      .$promise.then(
        function(response) {
          var message = '\
              <div class="ngdialog-message">\
                <div><h3>Usuário salvo com sucesso</h3></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button" ng-click=confirm("OK")>OK</button>\
                </div>';
          ngDialog.openConfirm({
            template: message,
            plain: 'true'
          });
          $state.reload();
        },
        function(response) {
          var message = '\
              <div class="ngdialog-message">\
                <div><h3>Usuário não foi salvo!</h3></div>' +
                '<div><p>' + response.data.error.message + '</p><p>' +
                response.data.error.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button" ng-click=confirm("OK")>OK</button>\
                </div>';
          ngDialog.openConfirm({
            template: message,
            plain: 'true'
          });
        }
      );
    };
  $scope.deleteUsuario = function(usuarioId){
      Usuario.deleteById({id: usuarioId})
      .$promise.then(
        function(response) {
          var message = '\
              <div class="ngdialog-message">\
                <div><h3>Usuário excluído com sucesso</h3></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button" ng-click=confirm("OK")>OK</button>\
                </div>';
          ngDialog.openConfirm({
            template: message,
            plain: 'true'
          });
          $state.reload();
        },
        function(response) {
          var message = '\
              <div class="ngdialog-message">\
                <div><h3>Usuário não foi excluído!</h3></div>' +
                '<div><p>' + response.data.error.message + '</p><p>' +
                response.data.error.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button" ng-click=confirm("OK")>OK</button>\
                </div>';
          ngDialog.openConfirm({
            template: message,
            plain: 'true'
          });
        }
      );
  };

}])

;
