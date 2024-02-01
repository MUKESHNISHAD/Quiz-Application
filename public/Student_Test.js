//QuizeList.js
var q_count = 1;
var c = 1;
var title_id = [];
document.getElementById('Add').addEventListener('click', (evt) => {
    var ele = document.getElementById('Title');
    var title = ele.value;
    if (title == '' || title == null) return;
    console.log(title);
    ele.value = '';
    AddQuize(title, q_count);
    var a = document.querySelectorAll('.main')[0];
    console.log(a.childNodes[c].id);
    c += 2;
    q_count++;
});

function Create(q_id, title) {
    var data = {
        quiz_id: q_id
        , title: title
    };
    console.log("title = ", title);
    console.log('Data to be sent:', data); // Add this line to log the data
    fetch('http://localhost:3000/index', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                // Handle other cases if needed
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


function AddQuize(title, q_count) {
    const find = { title, q_count };
    title_id.push(find);
    var ele = `
    <div id=${q_count}>
        <div class='Quize' id=${title}>
            <span class='Title'><b>Title :</b> ${title}</span>
            <span class="navigation-Tittle"> <button id="q_test" >Test </button></a></span> 
        </div>
    </div>`;
    document.getElementsByClassName('main')[0].innerHTML += ele;
}

function Adding(title, q_count) {
    var ele = `
    <div id=${q_count}>
        <div class='Quize' id=${title}>
            <span class='Title'><b>Title :</b> ${title}</span>
             <span class="navigation-Tittle"> <button id="q_test" >Test </button></a></span>
             <span class="navigation-Tittle"> <button id="q_LeaderBord" >Leader Bord </button></a></span>
         </div>
    </div>`;
    document.getElementsByClassName('main')[0].innerHTML += ele;
}
window.onload = Adding_Data_From_Server;
function Adding_Data_From_Server() {
    fetch('http://localhost:3000/getMainData')
        .then(response => response.text())
        .then(data => {
            console.log(JSON.parse(data));
            data = JSON.parse(data);
            for (let i = 0; i < data.length; i++) {
                Adding(data[i].tittle, data[i].q_id);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


document.getElementsByClassName('main')[0].addEventListener('click', (evt) => {
    const ele = evt.target;
    if (ele.id == 'q_create') {
        const quiz_count = ele.parentElement.parentElement.parentElement.id;
        const { title } = title_id.find(o => {
            return o.q_count == quiz_count;
        })
        Create(quiz_count, title);
    } else if (ele.id == 'q_test') {
        var _title = ele.parentElement.parentElement.id;
        var quiz_id = ele.parentElement.parentElement.parentElement.id;
        q_test(quiz_id, _title);
    } else if (ele.id == 'q_LeaderBord') {
        var _title = ele.parentElement.parentElement.id;
        var quiz_id = ele.parentElement.parentElement.parentElement.id;
        LeaderBord(quiz_id, _title);
    }
})

function LeaderBord(q_id,title){
    var data = {
        quiz_id: q_id
        , title: title
    };
    fetch('http://localhost:3000/LeaderBord', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                // Handle other cases if needed
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function q_test(q_id, title) {
    var data = {
        quiz_id: q_id
        , title: title
    };
    console.log("title = ", title);
    console.log('Data to be sent:', data); // Add this line to log the data
    fetch('http://localhost:3000/test', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                // Handle other cases if needed
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


// Access the quize id :
var a = document.querySelectorAll('.main')[0];
// var a = document.querySelectorAll('.container')[0];
console.log(a.childNodes);
function RemoveQuize(ele) {
    if (ele?.id == 'q_remove') {
        ele = ele.parentElement.parentElement;
        var parent = ele.parentElement;
        parent.removeChild(ele);
    }
}

