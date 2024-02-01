var Quesion_Number = 1;
function AddQuesion() {
    if (Quesion_Number < 6) {
        var _quiz = document.getElementById('Container');
        var data = document.createElement('div');
        data.className = "QuesionWrapper";
        data.innerHTML = `
    <div id='close${Quesion_Number}' class='close'> X</div>
    <label for="Quesion" class='Question_No'>${Quesion_Number} <b>Quesion Name :</b></label><br>
    <input type="text" id="quesion${Quesion_Number}" placeholder="Enter Quesion" required>
    <label for="Mark"> <b>Quesion Mark :</b></label>
    <input type="number" id="mark${Quesion_Number}" min="1" max="10" placeholder="Mark" required>
    <input id="A${Quesion_Number}" type="text" placeholder="Option 1" required>
    <input id="B${Quesion_Number}" type="text" placeholder="Option 2" required>
    <input id="C${Quesion_Number}" type="text" placeholder="Option 3" required>
    <input id="D${Quesion_Number}" type="text" placeholder="Option 4" required>
    <input id="ANSWER${Quesion_Number}" type="number" placeholder="Enter Right Answer" min="1" max="4" required>
    `;
        Quesion_Number += 1;
        _quiz.appendChild(data);
    } else return;
}
function Submit() {
    console.log('sumbit');
    const Data = [];
    const urlParams = new URLSearchParams(window.location.search);
    // Data.push({ tittle: document.getElementById('tittle').value, Quesions:Quesion_Number });
    for (let i = 1; i < Quesion_Number; i++) {

        const question = document.getElementById(`quesion${i}`).value;
        const mark = document.getElementById(`mark${i}`).value;
        const option1 = document.getElementById(`A${i}`).value;
        const option2 = document.getElementById(`B${i}`).value;
        const option3 = document.getElementById(`C${i}`).value;
        const option4 = document.getElementById(`D${i}`).value;
        const Answer = document.getElementById(`ANSWER${i}`).value;

        Data.push({
            q_id: urlParams.get('q_index'),
            tittle: urlParams.get('title'),
            quesion: question,
            mark: mark,
            option: [option1, option2, option3, option4],
            Ans: Answer,
            Quesion_Number: i
        });
    }
    console.log(Data);

    // Send data to the server using fetch
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function printId() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID_NO = urlParams.get('q_index');
    const Title = urlParams.get('title');

    console.log(ID_NO, Title);
    document.getElementById('q_id').innerHTML = ID_NO;
    document.getElementById('tittle').value = Title;

}
window.onload = printId;

function RemoveQuestion(id) {
    var div = document.getElementById(id).parentElement;
    var parent = div.parentElement;
    parent.removeChild(div);
}

document.getElementById('Container').addEventListener('click', (evt) => {
    var target = evt.target;
    console.log(target.className);
    if (target?.className == 'close') {
        var ele = target.parentElement;
        var parent = ele.parentElement;
        parent.removeChild(ele);
        Quesion_Number -= 1;
        var c = document.getElementsByClassName('Question_No');
        for (let i = 0; i < c.length; i++) {
            c[i].innerHTML = (i + 1) + ' <b>Quesion Name :</b>';
        }
    }
    else return;
})
