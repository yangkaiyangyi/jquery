
document.addEventListener('DOMContentLoaded',()=>{
 
    //获取页面元素
    let btnAll = document.querySelector('.goods_lists_nav');

    let goodslist = document.querySelector('.goodsliebiao');

    let page = document.querySelector('#page');
   
    // console.log(goodslist)

    //ajax
    // 1.创建请求对象
    let xhr = new XMLHttpRequest();

    format();
    //分页查询
    function  format(){
         // 1声明状态码
    let statusCode = [200 , 304]
     //2.与listphp建联系，传参
    xhr.open('POST','../api/list.php',true);
     //4,处理服务器返回的信息
     xhr.onload = ()=>{
        if(statusCode.indexOf(xhr.status)>=0){
            // console.log(xhr.responseText);
            
            let res =JSON.parse(xhr.responseText);

            //生成页码
            let num = res.pagenum;
            
            //页码
            page.innerHTML = '';
            let spanf = document.createElement("span");
            spanf.innerHTML ="首页";
            page.appendChild(spanf);

            let span = document.createElement("span");
            span.innerHTML ="上一页";
            page.appendChild(span);

            for(let i =0;i<num;i++){
                let span = document.createElement("span");
                span.innerHTML = i+1;

                if(i == res.page-1){
                    span.className = "active";
                }
                page.appendChild(span);
            }

            let span2 = document.createElement("span");
                span2.innerHTML ="下一页";
                page.appendChild(span2);

            let spanl = document.createElement("span");
            spanl.innerHTML ="尾页";
            page.appendChild(spanl);

             //创建ul元素
            let ul = document.createElement('ul');

            //动态生成html结构
            ul.innerHTML = res.rows.map(goods=>{
                return`
                <li class="list_item first_item " guid="${goods.id}">
             
                    <img src="../${goods.imgurl}" alt="" srcset="" class="picture1">
              
                <p class="good_price">
                   $ ${goods.prices}
                   </p>
                <h2 class="h31">
                    <a href="#" class="goods_content"> 
                    ${goods.title}
                    <span>爱尔兰优质奶源</span>                                                            
                     </a> 
                </h2>
                <P class="list_carbtn">
                    加入购物车
                </P>
                <p class="list_bottom">
                    <span><a href="#">海豚村精英英国精英馆</a> </span>
                    <span></span>
                </p>
             </li>
                `
            }).join('');
            goodslist.innerHTML='';
            goodslist.appendChild(ul); 
            
            //点击传送id到详情页
            //点击传送id到详情页
            goodslist.onclick = e =>{
                // console.log(goodslist)
                    
                    
                        if(e.target.className === 'picture1' || e.target.className === 'h31'){
                            
                            //获取当前li标签的id
                        let id =  e.target.parentNode.getAttribute('guid');

                        console.log(id)
                        
                        location.href="../html/goods.html?id="+id;
                        }
                
                    
                  }
                
        }
     }

    // 设置请求头(只有post时候设置，get不用)
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //3发送请求
    xhr.send("page=1")
    }
   
    //点击页码分页
    page.onclick = function(e){
        let target = e.target
        let pagenow;

        xhr.open("POST","../api/list.php",true);

        
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        
         if(target.tagName.toLowerCase() == "span" && target.innerHTML != "首页" && target.innerHTML != "尾页"&& target.innerHTML != "上一页" && target.innerHTML != "下一页" ){
            // console.log(target.innerText);
           let page = target.innerText;
            xhr.send("page="+page);
        }

        if(target.tagName.toLowerCase() == "span" && target.innerHTML == "首页"){
            // let page1 = document.getElementsByClassName("active")[0].innerText;
            let page1 = 1;
            xhr.send("page="+page1);
        }

        if(target.tagName.toLowerCase() == "span" && target.innerHTML == "上一页"){
           
            let page1 = document.getElementsByClassName("active")[0].innerText;
           
            xhr.send("page="+(page1 - 1));
        }
        if(target.tagName.toLowerCase() == "span" && target.innerHTML == "下一页"){
            let page1 = document.getElementsByClassName("active")[0].innerText;
            
            xhr.send("page="+(page1*1 + 1));
        }
        if(target.tagName.toLowerCase() == "span" && target.innerHTML == "尾页"){
            // let page1 = document.getElementsByClassName("active")[0].innerText;
            let page1 = 3;
            xhr.send("page="+page1);
        }

        if(target.className == "active"){
          
            let ac = document.getElementsByClassName("active");
            
        }

    }
    


    //点击价格，销售量排序
    let desc = true;//声明排序
    let asc;
    btnAll.onclick = e =>{
        xhr.open("POST","../api/list.php",true);

        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        //推荐排序
        if(e.target.className === 'tuijian'){
               asc = 3;
                //发送请求
                xhr.send("desc="+(asc));
            };

        if(e.target.className === 'pricesbtn'){
        //    if(desc){
        //         asc = 1;
        //    }else{
        //         asc = 0;
        //    }
           asc = desc? 1:0;
            console.log(asc);
            //发送请求
            xhr.send("desc="+(asc));
        };
         desc = !desc;

        

         //最新上架
         if(e.target.className === 'listnew'){
            asc = 4;
             //发送请求
             xhr.send("desc="+(asc));
         };

         //最佳销量
         if(e.target.className === 'salesbtn'){
            asc = 5;
             //发送请求
             xhr.send("desc="+(asc));
         };

    }

    
   

});