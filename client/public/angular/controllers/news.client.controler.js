angular.module('webapp')
.controller('NewsController',['$scope','NewsService',NewsController]);

function NewsController($scope,NewsService){
    console.log($scope,NewsService)
    $scope.list = [];
    $scope.current = {};
    $scope.new = {};

    $scope.save = function(){
        if(!$scope.new.title){
            $scope.editorMessage = 'Title is required';
            return;
        }
        if(!$scope.new.content){
            $scope.editorMessage = 'Content is required';
            return;
        }

        $scope.editorMessage = '';

        NewsService.save($scope.new).then(
            function(data){
                $("#modal-editor").modal('hide')
                $scope.loadNews();
            },
            function(err){
                $scope.editorMessage = err;
            }
        );
    };

    $scope.createNews = function(){
        $("#modal-editor").modal('show');
    };

    $scope.openNewsDetail = function(id){
        $scope.loadDetail(id);
        $("#modal-detail").modal('show');
    };

    $scope.loadDetail = function(id){
        NewsService.detail(id).then(
            function(data){
                console.log(data)
                $scope.current = data.data.results;
            },
            function(err){}
        );
    };

    $scope.formatTime = function(time){
        return moment(time).format('YYYY-MM-DD');
    };
    $scope.loadNews = function(){
        NewsService.list().then(
            function(data){
                $scope.list = data.data.results;
                console.log($scope.list)
            },
            function(err){
                console.log('err',err)
            }
        );
    };
    $scope.loadNews();
    console.log("$scope.list",$scope.new)
}