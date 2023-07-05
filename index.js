var countInterval;
var counterRunning = false;
var countPaused = false;
var count = 0;
var currentNos;
var nextNos;
var pauseButton;

function startCounter() {
    if (counterRunning) return;

    var number = parseInt(document.getElementById("number").value);

    if (isNaN(number)) {
        alert("Please enter a number");
        return;
    }

    if (number < 1 || number > 99999) {
        alert("Range out of bounds");
        return;
    }

    currentNos = document.querySelectorAll(".counter .current");
    nextNos = document.querySelectorAll(".counter .next");

    if (!countPaused) {
        resetNumbers(currentNos, nextNos, 5);
        count = 0;
    }

    clearInterval(countInterval);

    countInterval = setInterval(function () {
        if (count === number) {
            clearInterval(countInterval);
            alert("Counter has stopped");
            counterRunning = false;
            return;
        }

        if (countPaused) return;

        increaseCount(currentNos, nextNos, 4);
        count++;
    }, 500);

    counterRunning = true;
}

function pauseCounter() {
    countPaused = !countPaused;

    pauseButton = document.getElementById("pauseButton");

    if (countPaused) {
        pauseButton.innerText = "Resume Counter";
    } else {
        pauseButton.innerText = "Pause Counter";
    }
}

function stopCounter() {
    if (!counterRunning) return;

    clearInterval(countInterval);
    resetNumbers(currentNos, nextNos, 5);
    count = 0;
    counterRunning = false;
    countPaused = false;

    pauseButton.innerText = "Pause Counter";
}

function resetNumbers(currentNos, nextNos, end) {
    for (var i = 0; i < end; ++i) {
        currentNos[i].innerText = 0;
        nextNos[i].innerText = 1;
    }
}

function increaseCount(currentNos, nextNos, index) {
    let current = currentNos[index];
    let next = nextNos[index];

    if (current.innerText == 9) {
        increaseCount(currentNos, nextNos, index - 1);
    }

    next.classList.add("animate");

    setTimeout(function () {
        current.innerText = next.innerText;
        next.classList.remove("animate");
        next.innerText = parseInt(next.innerText) + 1;
        if (next.innerText > 9) {
            next.innerText = 0;
        }
    }, 50);
}