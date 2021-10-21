angular.module('webapp')
.service('NewsService',['$http','$q',NewsService]);

function NewsService($http,$q){
    function handleRequest(method,url,data){
        var defered = $q.defer();
        var config = {
            method:method,
            url:url
        };
        if ('POST' === method){
            config.data = data
        } else if('GET' === method){
            config.params = data;
        }
        $http(config).then(function (data){
            defered.resolve(data);
        },function(err){
            defered.reject(err);
        });    
        return defered.promise;
    }
    return {
        list:function(params){
            return handleRequest('GET','http://localhost:1223/books/get/books',params);
        },
        save:function(data){
            return handleRequest('POST','http://localhost:1223/books/creact/books',data);
        },
        detail:function(id){
            return handleRequest('GET','http://localhost:1223/books/get/books/' + id);
        }
    }
}