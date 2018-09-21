requirejs.config({
    paths : {
        //新名字：旧名字
         "a": "../lib/jquery-1.7.min",
         "b":"../lib/common",
         "c":"../lib/quick_links",
         "d": "goods",
         "e":"../lib/parabola",
         "f":"../lib/jquery-1.4.2.min",
         "g":"../lib/jquery.imagezoom.min"
    },

    shim:{
        "g":{
            deps:["f"]
        },
        "b":{
            deps:["a"]
        },
        "c":{
            deps:["a"]
        },
        "e":{
            deps:["a"]
        },
      
     }

});


requirejs(["a","b","c","d","e","f","g"],function(){
    //这里的代码等common，moduleA，moduleB，moduleC模块都加载完成后执行
   
    
});