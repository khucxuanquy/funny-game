var RanDomIdImg, RanDomImg, Src, html;
var option1 = 0,
    option2 = 0,
    option3 = 0,
    coefficient = 1,
    timeStart = 3,
    countDown = 30;
var Point = 0;

let main_list = document.querySelector('.main__list__image>br')
for (let i = 0; i < 9; i++) {
    main_list.insertAdjacentHTML('beforebegin', `<img id="item-${i + 1}" onmousedown="ClickItem('#item-${i + 1}')" src="./img/default.png">`)
}

let $ = el => document.querySelector(el);
let setAttr = (el, property, value) => $(el).setAttribute(property, value);
let changeCursor = value => $("main").className = value

function setDefaultAllImage() {
    let arr = document.querySelectorAll(".main__list__image>img");
    for (let i = 0; i < arr.length; i++) arr[i].setAttribute('src', './img/default.png');
}

let el_point = $('#CheckPoint')

// random id cookie

/**
 * 
 * @param {String} id_element 
 * click img tag to active this function
 */
function ClickItem(id_element) {
    handlePoint(id_element);
    el_point.innerHTML = Point
    setAttr(id_element, "src", "./img/default.png");
}

// exit mouse right
document.addEventListener('contextmenu', (e) => e.preventDefault())

//Start game
function startGame() {
    if (timeStart == 3) {
        ringSound();
        $(`#btnStartGame`).innerHTML = timeStart
        let countDown3s = setInterval(() => {
            ringSound()
            timeStart--;
            $(`#btnStartGame`).innerHTML = timeStart
            if (timeStart == 0) {
                $(`#btnStartGame`).innerHTML = "GO!"
                clearInterval(countDown3s);
                mainGame();
                muSic.volume = 0.4;
            }
        }, 1000);
    }
}

function checkOptionRight() {
    if (Point < 20) return;

    Point > 20 && option1 == 0 ? setAttr("#ImgOption1", "style", "opacity: 1;") : setAttr("#ImgOption1", "style", "opacity: 0.2;");
    Point > 30 && option2 == 0 ?
        setAttr("#ImgOption2", "style", "opacity: 1;") : setAttr("#ImgOption2", "style", "opacity: 0.2;");
    Point > 50 && option3 == 0 ?
        setAttr("#ImgOption3", "style", "opacity: 1;") : setAttr("#ImgOption3", "style", "opacity: 0.2;");
}

//main game
function mainGame() {
    setAttr('.main__list__image', 'style', 'display: unset')
    checkOptionRight()
    var TimeDownInterval = setInterval(() => {
        countDown--;
        $(`#TimeCountDown`).innerHTML = countDown
        $(`#btnStartGame`).innerHTML = "Time"

        if (countDown == 0) {
            clearInterval(TimeDownInterval);
            muSic.volume = 0.2;
        }
    }, 1000);
    // show random Images
    var Interval = setInterval(() => {
        RanDomIdImg = Math.round(Math.random() * 10) + 1;
        RanDomImg = Math.round(Math.random() * 10);
        if (RanDomIdImg >= 1 && RanDomIdImg <= 9) setAttr('#item-' + RanDomIdImg, "src", "./img/" + RanDomImg + ".svg");
        else setDefaultAllImage()

        if (countDown == 0) { // stop & show info
            clearInterval(Interval);
            $("#form h1").innerHTML = Point;
            setAttr('#form', 'style', 'display: unset')
            setDefaultAllImage();
            $(`#TimeCountDown`).innerHTML = ''
            $(`#btnStartGame`).innerHTML = 'Time Up'
            setAttr('.main__list__image', 'style', 'display: none')
        }
    }, 450);
}
//handle Points
function handlePoint(el) {
    let Src = $(el).getAttribute("src");
    switch (Src) {
        case "./img/0.svg":
        case "./img/1.svg":
        case "./img/2.svg":
            Point += coefficient;
            break;
        case "./img/3.svg":
        case "./img/4.svg":
            Point += (2 * coefficient);
            break;
        case "./img/5.svg":
        case "./img/6.svg":
            Point += (3 * coefficient);
            break;
        case "./img/7.svg":
        case "./img/8.svg":
            Point += (4 * coefficient);
            break;
        case "./img/9.svg":
        case "./img/10.svg":
            Point -= (5 * coefficient);
            Point <= 0 ? Point = 0 : '';
            missSound();
            break;
        default:
            Point += coefficient;
            Point <= 0 ? Point = 0 : "";
            missSound();
            break;
    }

}
// choose Option right
function ChooseOption(ID) {
    switch (ID) {
        case "ImgOption1":
            if (Point >= 20 && option1 == 0) {
                changeCursor("cursor-hammer");
                setAttr("main", "onclick", "hammerSound()")
                Point -= 20;
                option1 = 1;
                coefficient = 2;
            }
            break;
        case "ImgOption2":
            if (Point >= 30 && option2 == 0) {
                changeCursor("cursor-sword");
                setAttr("main", "onclick", "swordSound()")
                Point -= 30;
                option2 = 2;
                coefficient = 3;
            }
            break;
        case "ImgOption3":
            if (Point >= 50 && option3 == 0) {
                changeCursor("cursor-gun");
                setAttr("main", "onclick", "gunSound()")
                Point -= 50;
                option3 = 3;
                coefficient = 4;
            }
            break;
    }
    el_point.innerHTML = Point
}

function resetForm() {
    option1 = 0;
    option2 = 0;
    option3 = 0;
    Point = 0;
    coefficient = 1;
    countDown = 30;
    timeStart = 3;
    $(`#TimeCountDown`).innerHTML = ''
    $(`#btnStartGame`).innerHTML = 'Start'

    changeCursor("bodyCursorDefault")
    setAttr("main", "onclick", "defaultSound()")
    el_point.innerHTML = Point
    setAttr('#form', 'style', 'display: none')
}

window.onload = function () {
    $(".main__list__image").addEventListener('click', () => checkOptionRight())
    $(".main__option__right").addEventListener('click', () => checkOptionRight())
    muSic.play();
    muSic.volume = 0.2;
    muSic.loop = true;
}