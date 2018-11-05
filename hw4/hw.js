let activeCell = null;

//Инициализация приложения

window.onload = () => {
    initApp();
    document.getElementById("btn-refresh").onclick = initApp;
}

function initApp() {
    let year = prompt("Введите год:");
    let month = prompt("Введите месяц (числом):");
    year = Number(year);
    month = Number(month);
    if (Number.isNaN(year) || Number.isNaN(month) || month < 1 || month > 12 || year < 0) {
        document.getElementsByTagName('h2')[0].innerText = "Пожалуйста, введите корректные данные";
        return;
    }
    setDateDisplay(year, month);
    drawCalendar(year, month);
    let dayCells = document.getElementsByClassName('dayCell');
    console.log(dayCells);
    [].map.call(dayCells, (el) => el.onclick = onCellClick)
}

//Рисуем календарь

function drawCalendar(year, month) {
    month--;
    let tableElement = document.getElementById("table");
    calendarHeaderHTML = getCalendarHeaderHTML(tableElement);
    calendarDaysHTML = getCalendarDaysHTML(year, month);
    tableElement.innerHTML = calendarHeaderHTML + calendarDaysHTML;
}

function getCalendarHeaderHTML() {
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return "<tr>" + weekDays.map((day) => "<th>" + day + "</th>").join('') + "</tr>";
}

function getCalendarDaysHTML(year, month) {
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    let firstDayOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    let lastDayOffset = firstDay.getDay() === 0 ? 0 : 7 - lastDay.getDay();
    let daysArr = [];
    for (let i = 0; i < firstDayOffset; i++) {
        daysArr.push('');
    }
    for (let i = 0; i < lastDay.getDate(); i++) {
        daysArr.push(i + 1);
    }
    for (let i = 0; i < lastDayOffset; i++) {
        daysArr.push('');
    }
    if (daysArr % 7 > 0) throw new Error("Error while rendering day numbers")
    let weeks = chunk(daysArr, 7);
    return weeks.map((week) => "<tr>" + week.map((dayNum) => dayNum ? "<td class='dayCell'>" + dayNum + "</td>" : "<td>" + dayNum + "</td>").join('') + "</tr>").join('');

}

function chunk(arr, len) {

    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

//Обработка кликов мыши по дням

function onCellClick(e) {
    if (activeCell) activeCell.className = "dayCell";
    activeCell = e.target;
    activeCell.className = "dayCell active";
}

//Изменение значения дисплея текущей даты

function setDateDisplay(year, month) {
    month--;
    let date = new Date(year, month, 1);
    console.log(date.getFullYear())
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    document.getElementsByTagName('h2')[0].innerText = months[date.getMonth()] + ', ' + date.getFullYear();
}

