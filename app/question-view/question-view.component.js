angular.module('questionView')
    .component('questionView', {
        templateUrl: 'question-view/question-view.template.html',
        controller: function($routeParams,$http) {
            console.log('view '+Date.now());
            let questionId = $routeParams.questionId;
            if(questionId){
                let self = this;
                $http.get('api/question?questionId='+$routeParams.questionId).then(function (response) {
                    let responseData = response.data;
                    if (responseData.status === 'SUCCESS') {
                        self.question = responseData.data;
                    }
                });
            }
        }
    })