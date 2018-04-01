angular.module('questionList')
    .component('questionList', {
        templateUrl: 'question-list/question-list.template.html',
        controller: function questionListCtrl($http, $routeParams) {
            console.log('list ' + Date.now());
            let self = this;
            this.questionList = [];
            this.selected = false;
            this.allSelected = false;
            this.pageCurrent = $routeParams.pageNumber;

            this.selectedIndexList = [];
            $http.get('api/questionlist').then(function (response) {

                let responseData = response.data;

                if (responseData.status === 'SUCCESS') {

                    self.questionList = responseData.data;
                }
            });



            this.selectAll = () => {
                this.selected = this.allSelected;

                for (let i in this.questionList) {
                    this.selectedIndexList[i] = this.allSelected;
                }

            }
            this.delete = () => {
                let index = 0;
                let questionIds = Object.assign([], this.selectedIndexList);
                let self = this;
                $http.post('api/deletequestion',{questionIds}).then(function (response) {

                    let responseData = response.data;

                    if (responseData.status === 'SUCCESS') {

                        for (let i = self.selectedIndexList.length - 1; i > -1; i--) {
                            console.log(self.selectedIndexList.length);
                             if (self.selectedIndexList[i]) {
                                 console.log(i + ' : ' + self.selectedIndexList[i])
                                 self.questionList.splice(i, 1);
                                 self.selectedIndexList.splice(i, 1);
                             }
                        }
                    }
                });
               


            }
            this.select = () => {
                this.selectedIndex = -1;
                for (let i in this.selectedIndexList) {
                    if (this.selectedIndexList[i]) {
                        this.selectedIndex = i;
                    }
                    else this.allSelected = false;
                }
                if (this.selectedIndex !== -1)
                    this.selected = true;
                else this.selected = false;

            }

        }
    })
