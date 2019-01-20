/**
 *
 * @ngdoc module
 * @name components.auth
 *
 * @requires ui.router
 * @requires firebase
 *
 * @description
 *
 * This is the auth module. It includes our auth components
 *
 **/
angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function ($firebaseRefProvider) {

    var config = {
      apiKey: "AIzaSyAAOUeUiCurdNVBPsVGahuAfdkrJlwsOK0",
      authDomain: "project-215770576270.firebaseapp.com",
      databaseURL: "https://project-215770576270.firebaseio.com",
      storageBucket: "project-215770576270.appspot.com",
    };

    $firebaseRefProvider
      .registerUrl({
        default: config.databaseURL,
        contacts: config.databaseURL + '/contacts'
      });

    firebase.initializeApp(config);
  })
  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  });
