// QuizeView.js
var Quize = {
    Title:'Example Quize',
    Marks:10,
    questions:[
        {
            question:'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options:[
                'option A','option B','option C','Option D'
            ]
        },
        {
            question:'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options:[
                'option A','option B','option C','Option D'
            ]
        },
        {
            question:'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options:[
                'option A','option B','option C','Option D'
            ]
        }
    ]
}

function createQuize(){
    var Title = document.getElementById('title');
    var mark = document.getElementById('marks');
    var questions = document.getElementById('Questions');
    Title.innerHTML = Quize.Title;
    mark.innerHTML = 'Each Questions:'+Quize.Marks+'Marks';
    for(let i=0;i<Quize.questions.length;i++){
        questions.innerHTML+=Built(Quize.questions[i].question,Quize.questions[i].options)
    }
}

function Built(question,options){
    var quize = `
    <div class='Qestion-Options'>
        <div class='Question'>
           Q. ${question}
        </div>
        <div class='Options'>
            <span class='Option'><input type='radio' class='Tick'/>${options[0]}</span>
            <span class='Option'><input type='radio' class='Tick'/>${options[1]}</span>
            <span class='Option'><input type='radio' class='Tick'/>${options[2]}</span>
            <span class='Option'><input type='radio' class='Tick'/>${options[3]}</span>
        </div>
    </div>`;
    return quize;
}

createQuize();