angular.module("myApp").component('executeButton', {
    templateUrl: '/jolokiaweb/static/component/executeButton.html',
    bindings: {
        bean: '<',
        operation: '<'
    },
    controller: function($scope, JolokiaService, $uibModal) {
        var $ctrl = this;
        $scope.loading = false;
        this.$onInit = function(){
            $scope.loading = false;
        }

        this.openForm = function() {
            var modalInstance = $uibModal.open({
                component: 'executeFormModal',
                resolve: {
                    bean: function(){ return $ctrl.bean; },
                    operation: function(){ return $ctrl.operation; }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
            });
        };

    }
});