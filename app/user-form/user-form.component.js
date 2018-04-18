angular.module('userForm')
.component('userForm',{
    templateUrl : 'user-form/user-form.template.html',
    controller : function userFormCtrl(){
        this.response = {show : false};
        this.user = [

        ];
        this.save = () => {
          let self = this;
          self.response.status = 'info';
          self.response.mess = 'Saving user...';
          self.response.show = true;
        }
    }
});
angular.module('userForm').directive('passwordVerify', passwordVerify);

function passwordVerify() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, elem, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        // watch own value and re-validate on change
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        // observe the other value and re-validate on change
        attrs.$observe('passwordVerify', function(val) {
          validate();
        });

        var validate = function() {
          // values
          var val1 = ngModel.$viewValue;
          var val2 = attrs.passwordVerify;

          // set validity
          ngModel.$setValidity('passwordVerify', val1 === val2);
        };
      }
    }
  }