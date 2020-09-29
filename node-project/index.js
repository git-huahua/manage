const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false })) 解析字符串
app.use(bodyParser.json()) //前端传的是对象，所以用这句解析
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors())
const db = mysql.createConnection({//连接数据库
    host: 'localhost',
    port: '3306',
    database:'大母猴',//数据库名字
    user: 'root',
    password: '129519'//数据库密码
})
//注册接口
app.post('/register', (req, res) =>{
    // console.log(req.body);
    let responseDate={
        code:null,
        message:'',
        name:null
    }
    let {reguesrName,regemail,regpassword,regidentify}=req.body
    //查询注册的用户名是否已存在数据库中
    db.query(`SELECT username, password FROM user_table WHERE username = '${reguesrName}'AND password='${regpassword}'`,(err, data)=>{
        if (err) {
           throw err 
        } else {
            if (data.length !=0) {
                responseDate.code=0,
                responseDate.message='用户名已存在',              
                setTimeout(() => {
                    res.json(responseDate)
                }, 1000);
                return false 
            }else{               
                db.query(`INSERT INTO user_table(username,password,email,identify) VALUES('${reguesrName}','${regpassword}','${regemail}','${regidentify}')`, err => {
                    //存入数据库
                    if (err) throw err;
                    responseDate.code=1,
                    responseDate.message='注册成功'
                    responseDate.name=reguesrName
                    setTimeout(() => {
                        res.json(responseDate)
                    }, 1000);
                })
            }
        }         
    })
})

//登录接口
app.post('/log', (req, res) =>{
    console.log(req.body);
    let logresponseDate={
        code:null,
        message:'',
        name:null,
    }
    let {logname,logpass}=req.body
    db.query(`SELECT username, password FROM user_table WHERE username = '${logname}'AND password='${logpass}'`,(err, data)=>{
           if (err) throw err
           if (data.length !=0) {
               logresponseDate.code=2,
               logresponseDate.message='登录成功',
               logresponseDate.name=logname
               setTimeout(() => { //之前字体加载完加载动画还在加载的原因是后端发送数据时间太快，要给个定时器
                 res.json(logresponseDate)
               }, 2000);
           } else {
               logresponseDate.code=3,
               logresponseDate.message='用户名或密码错误'
               setTimeout(() => {
                 res.json(logresponseDate)
               }, 2000);            
           }
    })
})

//订单数据获取接口
app.get('/getdata',(req,res) => {
                            //查询表datalist中所有数据               
       db.query(`SELECT * FROM datalist`,(err,backdata) => { //这里写法格式要注意，否则会出错
          if (err) throw err
        let getData=backdata
        let totaldata=backdata.length
          setTimeout(() => {
            res.json({getData,totaldata})
          }, 1000);
      }) 
})

//订单数据删除接口
app.post('/handle',(req,res) => {
    let {id} = req.body
    db.query(`delete from datalist where id=${id}`,(err) => {
         if (err) throw err
         else{
             db.query(`SELECT * FROM datalist`,(err,newData) => {
                   if (err) throw err
                   let total= newData.length
                   res.json({newData,total})
             })
         }
    })   
})
//订单数据新增接口
app.post('/add',(req,res) => {
    let {orderr,namee,price,num,supplier}=req.body
    db.query(`INSERT INTO datalist(orderr,number,price,supplier,namee) VALUES('${orderr}','${num}','${price}','${supplier}','${namee}')`,(err) => {
          if (err) throw err
          else{
            db.query(`SELECT * FROM datalist`,(err,mydata) => {
                if (err) throw err
                let total= mydata.length
                res.json({mydata,total})
             })
          }
    }) 
})

//编辑功能接口


//分页接口
app.get('/paging',(req,res) => {
        let{currentPage,pageSize}=req.query
        // currentPage 选择的是第几页 pageSize 每页展示多少条内容

        let start = (currentPage-1)*pageSize;

        db.query(`SELECT * FROM datalist`,(err,alldata) => {
             if (err) throw err
             else{
                let total= alldata.length
                //下面SQL语句表示从表datalist中查询：从${start}行开始后的${nbCont}个数据，
                //如SELECT * FROM datalist limit 10,3 表示查询从第十行开始后的3条数据
                db.query(`SELECT * FROM datalist limit ${start},${pageSize}`,(err,data) => {
                    if (err) throw err
                    res.send({data,total}) 
                })
             }
        })     
})    
app.listen(port, () => console.log(`服务器已运行`))