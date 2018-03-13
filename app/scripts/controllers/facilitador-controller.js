'use strict';
angular.module('jtdev')
  .controller('FacilitadoresController', ['$scope', 'Facilitador', 'Usuario', '$stateParams', '$state', 'ngDialog',
    function($scope, Facilitador, Usuario, $stateParams, $state, ngDialog) {
      $scope.showFacilitadores = false;
      $scope.message = "Loading ...";
      $scope.estado = $stateParams.uf;
      $scope.ativo = $stateParams.ativo;
      Facilitador.find({
          filter: {
            where: {uf: $stateParams.uf, ativo: $stateParams.ativo},
            order: ['uf ASC', 'ativo ASC', 'nome ASC'],
            include: {relation: 'usuario'}
          }
        })
        .$promise.then(
          function(response) {
            $scope.facilitadores = response;
            $scope.showFacilitadores = true;
          },
          function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
      $scope.editFacilitador = function(facilitador) {
        $scope.facilitador = facilitador;
      };
      $scope.saveFacilitador = function() {
        if (!$scope.facilitador.usuarioId) {
          $scope.facilitador.usuarioId = $stateParams.id;
        }
        Facilitador.updateAttributes({
            usuarioId: $scope.facilitador.usuarioId,
            id: $scope.facilitador.id,
            nome: $scope.facilitador.nome,
            ativo: $scope.facilitador.ativo,
            profissao: $scope.facilitador.profissao,
            email: $scope.facilitador.email,
            celular: $scope.facilitador.celular,
            fixo: $scope.facilitador.fixo,
            uf: $scope.facilitador.uf,
            cidade: $scope.facilitador.cidade,
            facebook: $scope.facilitador.facebook,
            instagram: $scope.facilitador.instagram,
            twitter: $scope.facilitador.twitter,
            linkedin: $scope.facilitador.linkedin,
            site: $scope.facilitador.site,
            curriculum: $scope.facilitador.curriculum,
            foto: $scope.facilitador.foto
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
                <div><h3>Usuário não salvo!</h3></div>' +
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
      $scope.deleteFacilitador = function(facilitadorId) {
        var facId = $scope.facilitador.usuarioId;
        Facilitador.deleteById({
            id: facilitadorId
          })
          .$promise.then(
            function(response) {
              var message = '\
              <div class="ngdialog-message">\
                <div><h3>Facilitador excluído com sucesso!</h3></div>' +
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
                <div><h3>Facilitador não foi excluído!</h3></div>' +
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

      $scope.carregaFoto = function(event) {
        var output = document.getElementById('output');
        file = event.files[0];
        if (file.size>100000){
          console.log('Favor carregar fotos menores do que 100 kB!');
          var message = '\
          <div class="ngdialog-message">\
            <div><h3>Favor carregar fotos menores do que 100 kB!</h3></div>' +
            '<div class="ngdialog-buttons">\
                <button type="button" class="ngdialog-button" ng-click=confirm("OK")>OK</button>\
            </div>';
          ngDialog.openConfirm({
            template: message,
            plain: 'true'
          });
        }
        else {
          output.src = URL.createObjectURL(file);
          var reader = new FileReader();
          reader.onloadend = function() {
            $scope.facilitador.foto = reader.result;
            $scope.$apply();
          }
          reader.readAsDataURL(file);
          $scope.facilitador.foto = reader.result;
        }
      };

//Código accordion angular-ui-bootstrap
      $scope.umPorVez = false;

      $scope.groups = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];

      $scope.items = ['Item 1', 'Item 2', 'Item 3'];

      $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
      };

      $scope.status = {
        isCustomHeaderOpen: false,
      };

//Fim Código accordion angular-ui-bootstrap

    }
  ])

;
