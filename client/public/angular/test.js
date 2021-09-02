// $.ajax({
//     type:"GET",
//     url:"http://localhost:1223/books/get/books/",
//     // xhrFields: {
//     //     withCredentials: true
//     // },
//     // crossDomain: true,
//     // timeout: 20000,
//     // async:true,
//     success:(res)=>{
//         console.log("成功",res)
//     },
//     error: (err) => {
//         console.log("失败",err)
//     }
// })

// xhr = new XMLHttpRequest();
// xhr.open("get","http://localhost:1223/news");
// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
// xhr.send();
// console.log(xhr.status)
// xhr.onreadystatechange=()=>{
//     if(xhr.status==200 && xhr.readyState ===4 ) {
//         var result=xhr.responseText;
//         console.log("成功",result)
//     }else{
//         console.log('===========================')
//     }
// }