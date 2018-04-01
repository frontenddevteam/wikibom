angular.module('pagination')
    .component('pagination', {
        templateUrl: 'pagination/pagination.template.html',
        bindings: { page: '@' },
        controller: function paginationCtrl($http) {
            this.prev = 0;
            this.next = 0;
            this.$onInit = function () {
                console.log('page ' + this.page);
                let page = parseInt(this.page);
                if(this.page === "" || this.page === 1){
                    this.prev = 0;
                    this.next = 2;
                }else{
                    this.prev = page - 1;
                    this.next = page + 1;
                }
              };
        }
    })
