var app =angular.module("myApp",[]);
app.controller("myCtrl",function($scope, $http){
    $scope.age = "";
    $scope.name = ["lucky-cat","Emil","Tobias","Linus"];
    $scope.personal = {name:'Jani',country:'Norway'};
    $scope.person = [{name:'Jani',country:'Norway'},{name:'Hege',country:'Sweden'}];
    $scope.allName = function() {
        return $scope.name.toString();
    };
    /*$http({
        method: "GET",
        url: "",
        //data: "" method为POST时
    }).then(function successCall(){
        //请求成功回调函数
    }, function faileCall(){
        //请求失败回调函数
    });

    $scope.callRemote = function(url, data, callback){
        $scope.onOff = false;
        transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
        $http.post(url, data, postCfg).success(function(reponse){
            if(typeof(reponse)==='object'){
                callback(reponse);
            }else{
               parent.layer.alert("登录信息过期，请重新登录", {shade: 0,skin : 'skin1',end: function(index){
                       parent.layer.close(index);
                       window.top.location.href="..";
                   }}, function(index) {
                       parent.layer.close(index);
                       window.top.location.href="..";
               });
            }
        }).error(function(){
            alert("当前资料保存失败，请稍后重试！");
            $("#save").prop('disabled',false);
        });
    },*/
})

app.filter('myFilter',function () {
    return function(x, xn){
        if(xn == "Jani"){
            return x.country;
        }else {
            return "the second country:" + x.country;
        }
    }
})
app.filter('myFilter2',function () {
    return function(x){
        return x.name +"-"+ x.country;
    }
})

var ageValidator = true;
app.directive("ageValidate", ["$http", function ($http){
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ctrl){
            scope.$watch(attrs.ngModel, function(a, b, scope){
                ageValidator = true;
                ctrl.$setValidity("ageValidate", true);
                scope.error = "";
                if(a.length == 0 && b != ""){
                    ageValidator = false;
                    ctrl.$setValidity("ageValidate", false);
                    scope.error = "请输入年龄！";
                }else if(!/^([1-9]{1}||[0-9]{2,3})$/.test(a)){
                    ageValidator = false;
                    ctrl.$setValidity("ageValidate", false);
                    scope.error = "请输入合适的年龄！";
                }else {
                    ageValidator = true;
                    ctrl.$setValidity("ageValidate", true);
                    scope.error = "";
                }
            })
        }
    }
}])