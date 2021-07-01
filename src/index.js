import './sass/main.scss';


class CountdownTimer {
    
    constructor({ selector,targetDate }) {
        this.targetDate = targetDate;
        this.selector = selector;
        this.startFaceClock();
        this.start();
    };

    startFaceClock() {
        const { days, hours, mins, secs } = this.getTimeComponents(0);
        this.updateTimer(days, hours, mins, secs);
    }

    start() {
        
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const differenceTime = this.targetDate - currentTime;
            const { days, hours, mins, secs } = this.getTimeComponents(differenceTime);
            this.updateTimer(days, hours, mins, secs);
            if (differenceTime <= 0) {
                clearInterval(intervalId)
                this.startFaceClock()
                return false;
            }

        }, 1000);
    }


    getTimeComponents(time) {
        const days = (Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, 0);
    }

    updateTimer( days, hours, mins, secs) {
        const daysRef = document.querySelector(`${this.selector} [data-value="days"]`);
        daysRef.textContent = days;
        const hoursRef = document.querySelector(`${this.selector} [data-value="hours"]`);
        hoursRef.textContent = hours;
        const minsRef = document.querySelector(`${this.selector} [data-value="mins"]`);
        minsRef.textContent = mins;
        const secsRef = document.querySelector(`${this.selector} [data-value="secs"]`);
        secsRef.textContent = secs;
        if (+days === 0 || +days === 1) {
            daysRef.nextElementSibling.textContent = "Day";
        } else (daysRef.nextElementSibling.textContent = "Days");
        if (+hours === 0 || +hours === 1) {
            hoursRef.nextElementSibling.textContent = "Hour";
        } else (hoursRef.nextElementSibling.textContent = "Hours");
        if (+mins === 0 || +mins === 1) {
            minsRef.nextElementSibling.textContent = "Minute";
        } else (minsRef.nextElementSibling.textContent = "Minutes");
        if (+secs === 0 || +secs === 1) {
            secsRef.nextElementSibling.textContent = "Second";
        } else (secsRef.nextElementSibling.textContent = "Seconds");
    }
};

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
})





