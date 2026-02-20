let [seconds, minutes] = [0, 0];
        let inactive = false;
        let timerRef = document.querySelector(".timer-display");
        const restartButton = document.getElementById("start-timer");
        const stopButton = document.getElementById("stop-timer");
        const container = document.querySelector(".container");
        const message = document.getElementById("message");

        let interval = null;

        const startTimer = () => {
            if (interval !== null){
                clearInterval(interval);
            }
            interval = setInterval(displayTimer, 1000);
        };

        restartButton.addEventListener("click", () => {
            inactive = false;
            initializeTimer();
        });

        const initializeTimer = () => {
            if (inactive) {
                return false;
            }
            [seconds, minutes] = [0, 0];
            timerRef.innerHTML = `00:00`;
            if (timerRef.classList.contains("hide")){
                timerRef.classList.remove("hide");
            }
            container.classList.add("hide");
            if(stopButton.classList.contains("hide")){
                stopButton.classList.remove("hide");
                restartButton.classList.remove("hide");
            }
            message.innerText = "";
            startTimer();
        };

        window.onload = initializeTimer;
        window.onmousemove = initializeTimer;
        window.onclick = initializeTimer;
        window.ontouchstart = initializeTimer;
        window.onkeydown = initializeTimer;

        stopButton.addEventListener("click", () => {
            clearInterval(interval);
            [seconds, minutes] = [0,0];
            timerRef.innerHTML = `00:00`;
            stopButton.classList.add("hide");
            restartButton.classList.add("hide");
            timerRef.classList.add("hide");
            message.innerText = "Exited Successfully";
        });

        function displayTimer(){
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
            }
            let m = minutes < 10 ? "0" + minutes : minutes;
            let s = seconds < 10 ? "0" + seconds : seconds;
            timerRef.innerHTML = `${m}:${s}`;
            if (seconds == 5 && minutes == 0){
                inactive = true;
                clearInterval(interval);
                message.innerText = "Are You Still There!?";
                container.classList.remove("hide");
            }
        }