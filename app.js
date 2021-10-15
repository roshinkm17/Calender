const grid = document.querySelector(".grid");
createLayout();
//create calender with current date
createCalender(new Date().getFullYear(), new Date().getMonth() == 0 ? 12 : new Date().getMonth()-1);
setCurrentMonth()

//find the satrting day of the month
function startOfMonth(year, month) {
    let res = new Date(year, month, 1);
    return res.toString().substring(0, 3);
}

//get how many days in that month
function getDaysinMonth(year, month) {
    return new Date(year, month+1, 0).getDate();
};

//get selected month and year
function getSelectedMonthYear() {
    let month = document.getElementById("months").value;
    let year = document.getElementById("years").value;
    return [month, year];

}

//set current month as default in month dropdown
function setCurrentMonth(){
    const months = document.getElementById("months").childNodes;
    const crntM = new Date().getMonth();
    months.forEach(monthel => {
        if (monthel.value == crntM+1){
            monthel.setAttribute("selected", true);
        }
    })
}

//create the year dropdown
const yearSelect = document.getElementById("years");
for (let i = 1900; i < 2100; i++) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.innerText = i;
    if (i == 2021) {
        opt.setAttribute("selected", true);
    }
    yearSelect.appendChild(opt);
}

//create the layout
function createLayout() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 6; i++) {
        days.map(day => {
            let div = document.createElement("div");
            div.classList.add("day");
            div.setAttribute("day", day);
            div.innerHTML = "";
            grid.appendChild(div);
        });
    }
}

//create the calender
function createCalender(y, m) {
    const days = document.querySelectorAll(".day");
    var count = 1;
    const som = startOfMonth(y,m);
    const nod = getDaysinMonth(y,m);
    let flag = false;
    days.forEach(dayEl => {
        if (dayEl.getAttribute("day") == som){
            flag = true;
        }
        if (count == nod+1){
            flag = false;
        }
        if (flag) {
            dayEl.innerHTML = count;
            dayEl.getAttribute("day") == "Sun" ? dayEl.classList.add("sun") : "";
            dayEl.classList.add("show");
        }
        else {
            dayEl.innerHTML = "";
            dayEl.classList.remove("show");
            dayEl.classList.remove("sun");
        }
        flag ? count++ : "";
    });
}

//add listeners to both the dropdowns
document.getElementById("months").addEventListener("change", (e) => {
    let [m, y] = getSelectedMonthYear();
    createCalender(y, m == 0 ? 12 : m-1);
});
document.getElementById("years").addEventListener("change", (e) => {
    let [m, y] = getSelectedMonthYear();
    createCalender(y, m == 0 ? 12 : m-1);
});