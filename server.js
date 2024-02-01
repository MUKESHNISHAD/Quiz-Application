const express = require('express')
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const { stringify } = require('querystring');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use('/public', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
// Mongo DB _
const UserDB = require('./userDB');

app.get('/user/signup',async (req,res)=>{
    let {username,useremail,pass} = req.query;
    let find = await UserDB.findUsers(useremail);
    if(find.length){
        res.send('User alredy there');
    }
    else{
        let result = await UserDB.createUser(username,useremail,pass);
        res.redirect('../ThankYou.html')
    }
});

app.get('/login',async(req,res)=>{
    let {useremail,pass} = req.query;
    let find = await UserDB.readUsers(useremail,pass);
    if(find.length && find[0].type=='admin'){
        res.redirect('../main.html')
    }else if(find.length && find[0].type == 'user'){
        res.redirect('../Student_Test.html')
    }
    else{
       res.send('Wrong id or password');
    }
});

app.get('/main', (req, res) => {
    fs.readFile('public/main.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
});
app.get('/Student_Test', (req, res) => {
    fs.readFile('public/Student_Test.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
});

app.post('/edit', (req, res) => {
    res.redirect(`/Edit.html?q_index=${req.body.quiz_id}&title=${req.body.title}`);
});


app.post('/save', (req, res) => {
    console.log("Fetching here ...");
    console.log(' Saved Data ', req.body);
    var point = req.body;
    change_id = point[0].q_id;
    Actual_Data = Actual_Data.filter((arg) => {
        return arg.q_id != change_id;
    })
    for (let i = 0; i < req.body.length; i++) {
        Actual_Data.push(point[i]);
    }

    res.redirect(`/ThankYou.html?q_index=${req.body.quiz_id}&title=${req.body.title}`);
});
//heres


var User_Answer = [];
var LeaderBord = [];
app.post('/UserAnswer', (req, res) => {
    var Right_Answer = [];
    var Data = req.body;
    var find = Data[0].q_id;
    User_Answer = [];
    var Test_Number = 0;
    for (var i = 0; i < req.body.length; i++) {
        User_Answer.push(Data[i]);
    }
    for (let i = 0; i < Actual_Data.length; i++) {
        if (find == Actual_Data[i].q_id) {
            Right_Answer.push({ Ans: Actual_Data[i].Ans, Mark: parseInt(Actual_Data[i].mark) });
        }
    }
    for (let i = 0; i < User_Answer[0].Real_Answer.length; i++) {
        if (Right_Answer[i].Ans == User_Answer[0].Real_Answer[i]) {
            Test_Number += Right_Answer[i].Mark;
        }
    }
    User_Answer[0].Test_no = Test_Number;
    for (let i = 0; i < User_Answer.length; i++) {
        LeaderBord.push(...User_Answer);
    }
    // console.log("Leader Bord Are : ", LeaderBord);
    // console.log("Right Answer Is : ", Right_Answer);
    // console.log("This Is User Answer With Their Name :", User_Answer);
    // console.log("Test Number Is ", Test_Number);
    res.end(`${Test_Number}`);
}); // working here matching the data and send there marks

// Sending The LeaderBord Data
var Leader_id=1;
app.post('/LeaderBord', (req, res) => {
    let Leader = req.body;
    Leader_id = Leader.quiz_id;
    console.log("Data Only machd", req.body, "Id:", Leader_id)

    res.redirect(`/LeaderBord.html`);
})

app.get('/LeaderBord_Data', (req, res) => {
    var leader_Data=[];
    console.log(LeaderBord)
    for (var i = 0; i < LeaderBord.length; i++) {
        if (Leader_id== LeaderBord[i].q_id) {
            leader_Data.push(LeaderBord[i]);
        }
    }
    console.log("Leader_ Data :: ",leader_Data)
    var data = JSON.stringify(leader_Data);
    res.end(data);
})
app.get('/getMainData', (req, res) => {
    var getMainData;
    getMainData = getUniqueElements(Actual_Data);
    getMainData = JSON.stringify(getMainData);
    res.end(getMainData);
})

var id_counter;
app.post('/Id_Send', (req, res) => {
    var obj = req.body;
    id_counter = obj.counter;
    // console.log('coutner Received ', id_counter);
    res.end("Complete Counter Received");
})

var q_index = [];
app.post('/index', (req, res) => {
    var { quiz_id, title } = req.body;
    // Check if x already exists in q_index
    var find_id = q_index.find((obj) => {
        return obj.quiz_id == quiz_id;
    })
    if (!find_id) {
        console.log('true');
        q_index.push(req.body);
    } else {
        console.log('flase : Not Set Install Already present in Box ');
        return res.send('Not Set Install');
    }
    console.log(q_index);
    res.redirect(`/index.html?q_index=${quiz_id}&title=${title}`);
});
app.post('/id_fetch', (req, res) => {
    res.send()
})
var View = [];
app.post('/view', (req, res) => {
    console.log('Here View Data Body', req.body);
    View.splice(0, View.length);
    View.length = 0;
    var id_check = req.body.quiz_id;
    var title_check = req.body.title;
    id_check = id_check.toString();
    title_check = title_check.toString();
    // console.log("their : ", id_check, title_check);
    // console.log("Actual Data : ", Actual_Data[0].q_id, Actual_Data[0].tittle)
    for (let i = 0; i < Actual_Data.length; i++) {
        if (id_check == Actual_Data[i].q_id && title_check == Actual_Data[i].tittle) {
            View.push(Actual_Data[i])
        }
    }
    res.redirect(`/Admin.html?q_index=${req.body.quiz_id}&title=${req.body.title}`);
});
app.post('/test', (req, res) => {
    console.log('Here View Data Body', req.body);
    View.splice(0, View.length);
    View.length = 0;
    var id_check = req.body.quiz_id;
    var title_check = req.body.title;
    id_check = id_check.toString();
    title_check = title_check.toString();
    // console.log("their : ", id_check, title_check);
    // console.log("Actual Data : ", Actual_Data[0].q_id, Actual_Data[0].tittle)
    for (let i = 0; i < Actual_Data.length; i++) {
        if (id_check == Actual_Data[i].q_id && title_check == Actual_Data[i].tittle) {
            View.push(Actual_Data[i])
        }
    }
    res.redirect(`/Test.html?q_index=${req.body.quiz_id}&title=${req.body.title}`);
});
app.get('/getData', (req, res) => {
    res.json(View);
});

const getUniqueElements = (arr) => {
    const uniqueElements = [];
    arr.forEach((obj) => {
        if (!uniqueElements.some(el => el.q_id === obj.q_id && el.tittle === obj.tittle)) {
            uniqueElements.push(obj);
        }
    });
    return uniqueElements;
};
app.get('/getMainData', (req, res) => {
    var getMainData;
    getMainData = getUniqueElements(Actual_Data);
    getMainData = JSON.stringify(getMainData);
    res.end(getMainData);
})

app.get('/test', (req, res) => {
    fs.readFile('./public/Test.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    })
});
var Actual_Data = [];
app.post('/submit', (req, res) => {
    const Data = req.body;
    for (let i = 0; i <= req.body.length - 1; i++) {
        Actual_Data.push(req.body[i]);
    }
    // console.log("Data Successfully Received ", Actual_Data);
});
app.post('/remove', (req, res) => {
    const Data = req.body;
    var id_check = req.body.quiz_id;
    var title_check = req.body.title;
    console.log("Remove : ", Data);
    // for (let i = 0; i < Actual_Data.length; i++) {
    //     if (id_check == Actual_Data[i].q_id && title_check == Actual_Data[i].tittle) {
    //         const removedObject = Actual_Data.splice(i, 1)[0];
    //     }
    // }
    Actual_Data = Actual_Data.filter((i) => {
        return i.q_id != id_check && title_check != i.tittle;
    })
    console.log("Data Successfully Remove Then Actual Data Remain On server :  ", Actual_Data);
});


app.post('/submitpage', (req, res) => {
    fs.readFile('./public/ThankYou.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
})

// Admin data 
app.listen(3000, () => {
    console.log("am listening on 3000 Port ");
})

