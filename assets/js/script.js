var questionArr = getQuestions();
console.log(questionArr)

var info = getLocal();
checkIn(info);

info = getLocal();
updateScores(info);
setEventListeners(questionArr);

renderQuestion(questionArr[parseInt(info.place)]);


function renderQuestion(question) {
    let info = getLocal();
    if (parseInt(info.place) < 10) {
        let i=1;
        //console.log(info.place)
        title = addToString(info.place, 1);
        //console.log('title:' + title)
        document.getElementById('title-string').textContent = 'Question ' + title + ' of 10';
        document.getElementById('question-string').textContent = question.question;
        question.ansArray.forEach(el => {
            let answer = 'answer_' + i;
            //console.log(answer);
            //console.log(el);
            let choice = document.getElementById(answer);
            //console.log(choice)
            
            choice.textContent = el;
            i++;
        });
    } else {
        document.getElementById('title-string').textContent = 'Test Complete! 🥳';
        document.getElementById('question-string').textContent = 'You got ' + (info.userScore / 1000) + ' out of 10 correct';
        if (parseInt(info.userScore) > parseInt(info.highScore)) {
            localStorage.setItem('highScore', info.userScore);
            let info = getLocal();
            updateScores(info);
        }
        for(let count = 1; count < 5; count++) {
            let answer = 'answer_' + count;
            //console.log(answer);
            //console.log(el);
            let choice = document.getElementById(answer);
            //console.log(choice)
            
            choice.textContent = 'Good Job 😁👍';
        }

    }
    

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



function setEventListeners(questionArr) {
    document.getElementById("next").addEventListener("click", () => {
        let info = getLocal();
        removeAnswer(answerClass(questionArr[parseInt(info.place)]));
        info.place = addToString(info.place, 1);
        localStorage.setItem('place', info.place);
        renderQuestion(questionArr[parseInt(info.place)]);
    });
    document.getElementById("reset").addEventListener("click", () => {
        info = getLocal();
        if(parseInt(info.place) < 10) {
            removeAnswer(answerClass(questionArr[parseInt(info.place)]));
        }
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
    info = getLocal();
    localStorage.setItem('userScore', 0);  
    localStorage.setItem('place', 0);
    if(parseInt(info.place) >= 10) {
        localStorage.setItem('place', 0);
    }
}

//console.log(testQuestion);

function getQuestions() {
    let questions = [
        'What is Javascript?',
        'What makes a scripting language different from other programming languages?',
        'Where is Javascript used?',
        'How are ogres, onions, and Javascript related?',
        'What is Node.js?',
        'What is an advantage of Node.js?',
        'What is a difference between syncronous and asyncronous code in Node.js?',
        'Who invented Javascript?',
        'How long did it take Brandon Eich to develop Javascript?',
        'Who is Satoshi Nakamoto?'
    ];

    let answers = [
        ['A baked good', 'A religious text', 'A scripting language (or programming language)', 'Shrek'],
        ['A scripting language does not have to be compiled to run', 'Shrek', 'Actors use scripting languages to audition for movie roles', 'Scripting languages were created by James Cameron, the patron saint of Papyrus.'],
        ['Here', 'There', 'Everywhere', 'Shrek?'],
        ['Donkey!', 'Layers', 'Shrek', '42'],
        ['The world’s largest and most powerful particle accelerator', 'Shrek', 'An interpreted, object-oriented high-level programming language with dynamic semantics', 'An asynchronous event-driven JavaScript runtime'],
        ['Ability to do heavy computation', 'Better efficiency and overall developer productivity', 'Shrek', 'Javascript is a rarely known language'],
        ['Synchronous code is exectued in sequence, asynchronous code does not wait for the previous task to finish before starting the next task', 'Shrek', 'This has nothing to do with javascript, these are olympic events', 'Allows multi threaded computation'],
        ['Shrek', 'Satoshi Nakamoto', 'Brendan Eich', 'John Glenn'],
        ['10 years', '10 days', '10 hours', 'Shrek'],
        ['Brandon Eich', 'Elon Musk', 'Vitalik Buterin', 'Shrek']
    ];

    let correct = [
        2, //1
        0, //2
        2, //3
        1, //4
        3, //What is nodejs
        1,  //An advantage of Nodejs
        0,
        2,
        1,
        3
    ];

    let arr = [];
    for(let i = 0; i < 11; i++) {
        let obj = {
            question: questions[i],
            ansArray: answers[i],
            correct: correct[i]
        }
        arr.push(obj)
    }
    return arr;
}