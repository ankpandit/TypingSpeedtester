let qouteAPI = 'https://api.quotable.io/random?minLength=80&maxLength=100'
let qoute ;

// word countings for result calculation 
let words ;
// timer 
let timerCounter;
let currTime ;

// for check() function
let prevString = ''
let count = 0 ;
let parent = document.getElementById('qoute')
const mistake = document.getElementById("mistakes")
let mistakeCount = 0 ;

async function getQoute(){
    let qoute
    await fetch(qouteAPI).then((response)=>{
        return response.json()
    }).then((response)=>{
        qoute =response.content
    })
    return qoute 
}
async function start(){
    qoute =await getQoute()
    words = qoute.split(" ")
    qoute = qoute.split("")
    htmlqoute = qoute.map(element => {
        return `<span class ='character'>${element}</span>`
    });
    const div = document.getElementById('qoute')
    div.innerHTML= htmlqoute.join("")

    // timer 
    clearInterval(timerCounter)
    timer()
    count =0 ;
    prevString =''
    mistakeCount = 0
    mistake.innerHTML = mistakeCount
    document.getElementById("startbutton").innerHTML = "Restart"
}


function timer(){
    currTime = 0;
    const time = document.getElementById('time')
    timerLock =false ;
    timerCounter = setInterval(() => {
        time.innerHTML = currTime ;
        currTime++
        if(currTime == 60){
            result()
        }
    }, 1000);
}

const ele = document.getElementById('inputfield')
let input ;
function check(){
    input = ele.value ;
    let qChild = parent.children[count]
    if(input.substring(prevString.length) == qoute[count]){
        qChild.id = 'success'
        count++ ;
    }
    else if(prevString.length >= input.length){
        let d = prevString.length - input.length
        while(d>0){
            count--;
            qChild = parent.children[count]
            qChild.id = 'normal'
            d-- ;
        }



        // count>0?count--:0
        // qChild = parent.children[count]
        // qChild.id = 'normal'
    }
    else{
        qChild.id = 'mistake'
        count++ ;
        mistakeCount++
        mistake.innerHTML = mistakeCount ;
    }
    prevString = input ;
    if(count == qoute.length){
        result()
    }
}

function result(){
    // start button restart 
    clearInterval(timerCounter)
    let accuracy = ((input.length - mistakeCount)/qoute.length) *100
    input = input.split(" ")
    let wordPerMinute = (input.length /currTime)*60
    const h4 = document.querySelectorAll("h4")
    h4.forEach((ele)=>{
        ele.style.display = "block"
    })
    document.getElementById('accuracy').innerHTML = Math.floor(accuracy)
    document.getElementById('speed').innerHTML = Math.floor(wordPerMinute)
}