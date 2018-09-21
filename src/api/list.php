<?php
/*
1.链接数据库

2.数据操作
  *读取数据库

*/

//before在创建链接前，可申明赋值
$servernam = 'localhost';//服务器
$username = 'root';//默认根地址
$password = '';//密码默认为空
$dbname = 'liuyanban';//数据库名


//1.创建与msql数据库链接
$conn = new mysqli($servernam,$username,$password,$dbname);

//2.检测链接是否成功
if($conn->connect_error){
    die("连接失败: " . $conn->connect_error);
};
//3.查询前设置编码，防止乱码
$conn->set_charset('utf8');





//-1查询前端发过来的分页数据
$page = isset($_POST["page"])?$_POST["page"] : 1 ;


// var_dump($page);
$num = 8;
 $sql = "select * from goodslist";
//5.获取查询结果集合(数据库内容)
$result = $conn->query($sql);

//6查询返回多少行
$total = mysqli_num_rows($result);

//7总页数 = 总行数/每页数量
$pagenum = ceil($total/$num);

//8当前页数判断
if($page>$pagenum){
    $page = $pagenum;
}
if($page<1){
    $page = 1;
}

//9每一页从第几个开始
$offset = ($page-1)*$num;
// var_dump("select * from goodslist order by id desc limit $offset,$num");
//10查询 id降序排列.取记录中的5条数据
$data = $conn->query("select * from goodslist order by id desc limit $offset,$num");

$desc = isset($_POST['desc']) ? $_POST['desc'] : null;

// var_dump($desc);

if($desc == 4){
    $data = $conn->query("select * from goodslist order by duty asc limit $offset,$num");
}
if($desc == 5){
    $data = $conn->query("select * from goodslist order by yuanjia asc limit $offset,$num");
}

if($desc == 1){ 
    $data = $conn->query("select * from goodslist order by prices desc limit $offset,$num");
}
if($desc == 0){
    $data = $conn->query("select * from goodslist order by prices asc limit $offset,$num");
}
if($desc == 3){
    $data = $conn->query("select * from goodslist order by id asc limit $offset,$num");
}



// if($data != true){
//     die("查询失败");
// }

//11存入数组
$row = [];
while($row = $data->fetch_array(MYSQLI_ASSOC)){
    $rows[] = $row;
}


// var_dump($sql);

//  var_dump($sql);
// //1>前端发送-人气-排序请求-->服务器接收请求参数
// $sort_hot = isset($_GET['sort_hot']) ? $_GET['sort_hot'] : null;
// //2>//判断排序
// if($sort_hot){
//     $sql .= " order by $sort_hot*1";//字符串拼接注意空格

//     // 降序
//     if($desc){
//         $sql .= " desc"; //字符串拼接注意空格
//     }
// }

//1>前端发送-好评-排序请求-->服务器接收请求参数
// $sort_reput = isset($_GET['sort_reput']) ? $_GET['sort_reput'] : null;
// //2>//判断排序
// if($sort_reput){
//     $sql .= " order by $sort_reput*1";//字符串拼接注意空格

//     // 降序
//     if($desc){
//         $sql .= " desc"; //字符串拼接注意空格
//     }
//     // var_dump($sql);
// }



// var_dump($result);
//6.从集合中获取数据
// $row = $result->fetch_all(MYSQLI_ASSOC);

$res = array(
      'pagenum' => $pagenum, //总页数
      'page' => $page*1, //当前页
      'rows' => $rows
);



// var_dump($row);//测试
//释放查询结果集合，避免浪费资源
$result->close();

//.关闭数据库，避免占用资源
$conn->close();       

//.把结果输出到前端
echo json_encode($res,JSON_UNESCAPED_UNICODE);   //-->输出到前端页面


?>