const currentDateMonth = document.querySelector('.current-date-month') // current-date-monthDOM
const currentDateYear = document.querySelector('.current-date-year') // current-date-monthDOM
const days = document.querySelector('.days') // 날짜 DOM
const prevNextButton = document.querySelectorAll('.fa-solid') // 이전 다음 버튼



let date = new Date() // 현재 날짜
let currYear = date.getFullYear() // 2023형식으로 불러옴
let currMonth = date.getMonth() // 1월을 0부터 가져옴

const months = ['January', 'February', 'March', 'April', 'May', 'june', 'July', 'August', 'September', 'October', 'November', 'December']

const renderCalendar = () => {

    let firstDate = 1
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay() // 현재 달의 첫번째 날짜의 요일
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate() // new Date의 끝에 0을 입력하는 이유는 전달의 마지막 날짜를 의미하기 때문
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay() // 현재 달의 마지막 날짜의 요일
    // 즉 현재 달의 마지막 날짜를 불러옴
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate() // 현재달의 마지막 날짜

    let day = ''

    for (let i = firstDayofMonth; i > 0; i--) { // 달의 1일이 어느 요일에서 시작하는지
        day += `<li class='inactive'>${lastDateofLastMonth - i + 1}</li>` // 저번달 마지막으로 끝나는 날이 31이고 이번달 시작 요일이 3번째라면 31-3, 31-2, 31-1이 차례로 담김
    }

    for (let i = 1; i <= lastDateofMonth; i++) {

        //현재 날짜가 맞다면 li에 active class추가
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? 'active' : ''
        // console.log(new Date(currYear, currMonth, i) == 0);
        let sunDay = new Date(currYear, currMonth, i).getDay() === 0 ? 'sunday' : ''
        day += `<li class='${isToday} ${sunDay}'>${i}</li>` // 1부터 현재 달의 마지막 날까지의 날짜들을 li태그에 담아 더한다
    }

    for (let i = lastDayofMonth; i < 6; i++) { // 요일은 sun : 0, mon : 1, tue : 2, wed : 3, thu : 4, fri : 5, sat : 6
        day += `<li class='inactive'>${firstDate++}</li>`
    }

    currentDateYear.innerText = currYear // year를 삽입해줌
    currentDateMonth.innerText = months[currMonth] // date를 통해서 받아오는 month는 0부터 이기 때문에 따로 월이 영어명으로 담긴 month배열 생성 후 값을 넣어 줌
    days.innerHTML = day

}
renderCalendar()

prevNextButton.forEach(icon => {
    icon.addEventListener('click', () => { // 이전 다음 버튼을 눌렀을 때 실행
        // 눌린 button이 이전 버튼이라면 currMonth - 1한 값을 currMonth에 할당해주고 아니라면 currMonth + 1한 값을 할당
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1
        if (currMonth === -1) {
            currMonth = 11
            currYear = currYear - 1
        }

        if (currMonth === 12) {
            currMonth = 0
            currYear = currYear + 1
        }
        renderCalendar() // 바뀐 currMonth에 맞게 rendring을 다시 해줌
    })
})