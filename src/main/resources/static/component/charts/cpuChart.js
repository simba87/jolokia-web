angular.module("myApp").component('cpuChart', {
    templateUrl: '/static/component/charts/simpleChart.html',
    bindings: {
    },
    controllerAs: 'ctx',
    controller: function($rootScope, DashboardService){
        this.labels = DashboardService.cpuChartData().labels;
        this.series = DashboardService.cpuChartData().series;
        this.data = DashboardService.cpuChartData().data;

        this.datasetOverride = [{ yAxisID: 'y-axis-cpu1' }];
        this.options = {
            scales: {
                yAxes: [{
                    id: 'y-axis-cpu1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        beginAtZero:true,
                        max: 100,
                        stepsize: 10
                    },
                    scaleLabel:{
                        display: true,
                        labelString: 'CPU load %',
                        fontColor: "#666666"
                    }
                }]
            },
            tooltips: {
                enabled: true,
                mode: 'label',
                callbacks: {
                    label: function (tooltipItems, data) {
                        return data.datasets[tooltipItems.datasetIndex].label + ": " + tooltipItems.yLabel + " % ";
                    }
                }
            }
        };

        this.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $rootScope.$on('chartChange',function(){
            this.labels = DashboardService.cpuChartData().labels;
            this.series = DashboardService.cpuChartData().series;
            this.data = DashboardService.cpuChartData().data;
        });
    }
});