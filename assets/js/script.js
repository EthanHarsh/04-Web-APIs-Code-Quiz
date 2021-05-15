var questionArr = getQuestions();

var info = getLocal();
checkIn(info);

info = getLocal();
updateScores(info);
setEventListeners(questionArr);

renderQuestion(questionArr[parseInt(info.place)]);


function renderQuestion(question) {
    let i=1;
    document.getElementById('question-string').textContent = question.question;
    question.ansArray.forEach(el => {
        let answer = 'answer_' + i;
        //console.log(answer);
        //console.log(el);
        let choice = document.getElementById(answer);
        
        choice.textContent = el;
        i++;
    })
}

function answerClass(question) {
    let arr = [];
    let i=0;
    question.ansArray.forEach(el => {
        if (i === question.correct) {
            arr.push('correct');
        } else {
            arr.push('incorrect');
        }
        i++;
    });
    //console.log(arr);
    return arr;
}

function renderAnswer(arr) {
    let i = 1;
    arr.forEach(el => {
        let answer = 'answer_' + i;
        //console.log(answer);
        let choice = document.getElementById(answer);
        //console.log(choice);
        choice.classList.add(el);
        i++;
    });
}

function removeAnswer(arr) {
    let i = 1;
    arr.forEach(el => {
        let answer = 'answer_' + i;
        //console.log(answer);
        let choice = document.getElementById(answer);
        //console.log(choice);
        choice.classList.remove(el);
        i++;
    });
}

function getLocal() {
    const info = {
        userScore: localStorage.getItem('userScore'),
        highScore: localStorage.getItem('highScore'),
        place: localStorage.getItem('place'),
        visits: localStorage.getItem('visits')
    }
    return info;
}

function newStats() {
   localStorage.setItem('userScore', 0);
   localStorage.setItem('highScore', 0);  
   localStorage.setItem('place', 0); 
   localStorage.setItem('visits', 1); 
}

function updateScores(info) {
     document.getElementById('user-score').textContent = info.userScore;
     document.getElementById('high-score').textContent = info.highScore;

     localStorage.setItem('userScore', info.userScore);
     localStorage.setItem('highScore', info.highScore);  
}

function checkIn(info) {
    if (!info.visits) {
        newStats();
    } else {
        localStorage.setItem('visits', addToString(info.visits, 1)); 
    }
}

function getQuestions() {
    let arr = [];
    for(let i = 0; i < 11; i++) {
        let name = 'object_' + i;
        let obj = {
            question: name,
            ansArray: ['sky is no purarepl===' + i, 'no' + i, 'yes' + i, 'possible' + i],
            correct: i % 4
        }
        arr.push(obj)
    }
    return arr;
}

function setEventListeners(questionArr) {
    document.getElementById("next").addEventListener("click", () => {
        let info = getLocal();
        removeAnswer(answerClass(questionArr[parseInt(info.place)]));
        info.place = addToString(info.place, 1);
        renderQuestion(questionArr[parseInt(info.place)]);
        localStorage.setItem('place', info.place);
    });
    document.getElementById("reset").addEventListener("click", () => {
        info = getLocal();
        removeAnswer(answerClass(questionArr[parseInt(info.place)]));
        resetTest();
        info = getLocal();
        updateScores(info);
        renderQuestion(questionArr[parseInt(info.place)]);
    });
    for(let i = 1; i < questionArr[0].ansArray.length + 1; i++) {
        let answer = 'answer_' + i;
        document.getElementById(answer).addEventListener("click", () => {
            let info = getLocal();
            let el = answer;
            el = parseInt(el.split("_").pop()) - 1;
            renderAnswer(answerClass(questionArr[parseInt(info.place)]))
            if (el === parseInt(questionArr[parseInt(info.place)].correct)) {
                info.userScore = addToString(info.userScore, 1000);
                updateScores(info);
                console.log('correct');
            }
        });
        //console.log(answerClass(questionArr[i-1]))
    }
}

function addToString(el, add) {
    el = parseInt(el) + add;
    el = el.toString();
    return el
}

function resetTest() {
    localStorage.setItem('userScore', 0);  
    localStorage.setItem('place', 0);
}

//console.log(testQuestion);

