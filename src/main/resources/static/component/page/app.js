angular.module("jolokiaWeb").component('app', {
    templateUrl: function(jsPath) {
        return jsPath.component + '/page/app.html';
    },
    bindings: {
    },
    controller: function(jsPath, JolokiaService, WebsocketService, Notification) {
        var self = this;

        self.$onInit = function(){
            self.wsUrl = jsPath.ws;
            
            self.hasPermission = JolokiaService.hasPermission;

            self.wsStatus = WebsocketService.wsStatus;
            self.wsStatusSub = WebsocketService.wsStatusEvent.subscribe(
                function(status) { self.wsStatus = status; }
            );

            self.clientErrorSub = WebsocketService.errorMessageEvent.subscribe(
                function(message) { 
                    Notification.error({
                        faIcon: 'fa-exclamation-triangle',
                        title: 'J4pClient has encountered a problem',
                        message: message.error,
                        delay: 10000,
                        replaceMessage: true
                    });
                }
            );
        }

        self.$onDestroy = function(){
            self.wsStatusSub.unsubscribe();
            self.clientErrorSub.unsubscribe();
        }
    }
});
