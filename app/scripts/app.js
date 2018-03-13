'use strict';
angular.module('jtdev', ['ui.router','ngResource','lbServices'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // Rota para a página pri ncipal
            .state('app', {
                url:'/',
                views: {
                  'navegacao': {
                      templateUrl : 'views/navegacao.html'//,
                      //controller  : 'NavegacaoController'
                  },
                  'cabecalho': {
                      templateUrl : 'views/cabecalho.html'
                  },
                  'conteudo': {
                      templateUrl : 'views/conteudo.html'
                  },
                  'rodape': {
                      templateUrl : 'views/rodape.html'
                  }
                }
            })
            // Rota para a página de usuários
            .state('app.usuarios', {
                url: 'Usuarios/:id',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/telalogin.html',
                        controller  : 'CabecalhoController'
                    }
                }
            })
            // Rota para a página de facilitadores
            .state('app.facilitadores-cadastro', {
                url: 'Usuarios/:id/facilitadors',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/facilitadores-cadastro.html',
                        controller  : 'FacilitadoresController'
                   }
                }
            })
            // rota para a página do mapa
            .state('app.mapa', {
                url: '/',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/mapa.html',
                        controller  : 'CabecalhoController'
                   }
                }
            })
            // Rota para a página de facilitadores por estado
            .state('app.facilitadores', {
                url: 'Facilitadors/:id',
                params: {
                   uf: null,
                   ativo: 'S'
                 },
                views: {
                    'conteudo@': {
                        templateUrl : 'views/facilitadores.html',
                        controller  : 'FacilitadoresController'
                    }
                }
            })
            // rota para a página de login
            .state('app.login', {
                url: '/Usuarios/telalogin',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/telalogin.html',
                        controller  : 'CabecalhoController'
                   }
                }
            })
            // Rota para a página de cadastro de novos facilitadores
            .state('app.novo-facilitador', {
                url: 'Facilitadors/:id',
                /*params: {
                   uf: null,
                   ativo: 'N'
                 },*/
                views: {
                    'conteudo@': {
                        templateUrl : 'views/novo-facilitador.html',
                        controller  : 'FacilitadoresController'
                    }
                }
            })
            ;
        $urlRouterProvider.otherwise('/');
    })
;
