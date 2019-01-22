
/**
 *
 * @ngdoc module
 * @name components
 *
 * @requires components.exercise
 * @requires components.auth
 *
 * @description
 *
 * This is the components module. It includes all of our components.
 *
 **/

angular
  .module('components', [
    'components.exercise',
    'components.auth'
  ]);
