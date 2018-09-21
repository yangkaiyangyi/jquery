requirejs.config({
    paths : {
        //新名字：旧名字
        
         "e":"jquery-1.10.1.min",
         "f":"carsecond",
         "g":"car"
    },
    
    //依赖
    shim:{
       "f":{
           deps:["e"]
       }
     
    }
});


requirejs(["g","e","f"],function($){
    //这里的代码等common，moduleA，moduleB，moduleC模块都加载完成后执行
    // console.log('hhhhh')
    
});