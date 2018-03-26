angular.module('questionForm')
    .component('questionForm', {
        templateUrl: 'question-form/question-form.template.html',
        controller: function($routeParams,$http) {
            this.response = {show : false};
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
            this.save = ()=>{
                let self = this;
                self.response.status = 'info';
                self.response.mess = 'Saving question...';
                self.response.show = true;
                
                $http.post('api/question?questionId='+questionId,this.question).then(function (response){
                    let responseData = response.data;
                    self.response =  responseData;
                    if(self.response.status === 'SUCCESS')
                        self.response.status = 'success';
                    else self.response.status = 'danger';
                    self.response.show = true;
                })
            }
        }
    })