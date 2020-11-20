const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const upload_dir = path.resolve(__dirname,'public/upload')

const db = mysql.createConnection({
    host: '47.101.58.132',
    user: 'lhc',
    password: 'lhc19980229',
    database: 'lhc'
});

// 处理跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// 添加数据
app.post('/add', (req, res) => {
    let post = req.body;
    let sql = `INSERT INTO stu SET ?`;
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('add....');
    });
});

//删除数据
app.post('/delete', (req, res) => {
    let item = req.body;
    console.log(item)
    let sql = `DELETE FROM stu WHERE cno = ${item.cno}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let SQL= 'SELECT * FROM stu';
        db.query(SQL, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
});

// 查询数据
app.get('/select', (req, res) => {
    let sql = 'SELECT * FROM stu';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

//修改数据
app.post('/update', (req, res) => {
    let item = req.body;
    let sql = `UPDATE stu SET cxfs = '${item.cxfs}',czxt = '${item.czxt}' ,rjsx = '${item.rjsx}',Web = '${item.Web}' ,UI = '${item.UI}',mzd = '${item.mzd}',yjcs = '${item.yjcs}'
  WHERE cno = ${
        item.cno
    }`;
    db.query(sql, (err, result) => {
        let hu= 'SELECT * FROM stu';
        db.query(hu, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
});

//文件上传
app.post('/upload',(req,res)=>{
    const form = new multiparty.Form({uploadDir:"temp"});
    form.parse(req);
    form.on('file',async (name,chunk)=>{
        let chunkDir = `${upload_dir}/${chunk.originalFilename.split('.')[0]}`;
        if(!fse.existsSync(chunkDir)){
            await fse.mkdirs(chunkDir);
        }
        var dPath = path.join(chunkDir,chunk.originalFilename.split('.')[1]);
        await fse.move(chunk.path,dPath,{overwrite:true})
        res.send('文件上传成功')
    })
})

//文件下载
app.post('/merge',async function(req,res){
    let name = req.body.name;
    let fname = name.split('.')[0];

    let chunkDir = path.join(upload_dir,fname);
    let chunks = await fse.readdir(chunkDir);
    chunks.sort((a,b)=>a-b).map(chunkPath=>{
        fs.appendFileSync(
            path.join(upload_dir,name),
            fs.readFileSync(`${chunkDir}/${chunkPath}`)
        )
    })
    fse.removeSync(chunkDir);
    if(req.body.name.includes('png')||
        req.body.name.includes('jpg')||
        req.body.name.includes('gif')||
        req.body.name.includes('jpeg')||
        req.body.name.includes('PNG')||
        req.body.name.includes('JPG')||
        req.body.name.includes('GIF')||
        req.body.name.includes('JPEG')
    ){
        let obj = {
            src:`http://localhost:5000/upload/${name}`,
            href:`http://localhost:5000/upload/${name}`,
            name:req.body.name,
            type:0,
            date:`${new Date().getFullYear()}-${parseInt(new Date().getMonth())+1}-${new Date().getDate()}`
        }
        let sql = `INSERT INTO img SET ?`;
        db.query(sql, obj, (err, result) => {
            if (err) throw err;
        });
    }else{
        let obj = {
            src:`http://localhost:5000/upload/${name}`,
            href:`http://localhost:5000/upload/${name}`,
            name:req.body.name,
            type:1,
            date:`${new Date().getFullYear()}-${parseInt(new Date().getMonth())+1}-${new Date().getDate()}`
        }
        let sql = `INSERT INTO img SET ?`;
        db.query(sql, obj, (err, result) => {
            if (err) throw err;
        });
    }
})

//获取文件下载路径
app.get('/img', (req, res) => {
    let sql = 'SELECT * FROM img';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(5000)