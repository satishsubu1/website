import { Element } from "./Element.js";
export class Brawler {
    constructor(brawler = {}) {
        this.element;
        this.unlocked = false;
        this.id = brawler.ID;
        this.name = brawler.NAME;
        this.disabled = brawler.DISABLED;
        this.arriving_soon = brawler.ARRIVING_SOON;
        this.arriving_time = brawler.ARRIVING_TIME;
        this.image_src = brawler.IMAGE_SRC;
        this.rarity = brawler.RARITY;
        this.hasArrived();
    }
    loadMilestone(milestone) {
        this.milestone = milestone;
    }
    loadRarity(rarity) {
        this.rarityObj = rarity;
    }
    add() {
        const brawler = document.getElementById(this.brawlerId);

        if (brawler === null) {
            this.createAndAdd();
        } else {
            this.element = brawler;
            this.update();
        }
        return this;
    }

    createAndAdd(domElement) {
        const element = document.getElementById(this.id);
        if (element) {
            element.remove();
        }
        this.create().appendToDom(domElement);
    }

    getTrophyWidth() {
        let progress = this.progress;
        let myProgress = this.trophies - this.progressStart;
        return (myProgress / progress) * 100;
    }

    create() {
        this.element = "";
        
        this.element = document.createElement("div");
        this.element.setAttribute("class", "brawler");
        this.element.setAttribute("id", this.id);
        this.element.setAttribute("data-name", this.name);

        const first = document.createElement("div");
        first.setAttribute("class", "first");

        //if the character is unlocked then do this
        if (this.unlocked) {

            //Create Progress
            const progress = document.createElement("div");
            progress.setAttribute("class", "progress");


            const progressFill = document.createElement("div");
            progressFill.setAttribute("class", "progress-fill");
            progressFill.style.width = `${this.getTrophyWidth()}%`;

            const trophies = document.createElement("div");
            trophies.setAttribute("class", "trophies");


            const trophiesNum = document.createElement("div");
            trophiesNum.setAttribute("class", "trophies-num");
            if (this.progressEnd) {
                trophiesNum.textContent = `${this.trophies}/${this.progressEnd}`;
            } else {
                trophiesNum.textContent = `${this.trophies}`;
            }

            progress.appendChild(progressFill);
            trophies.appendChild(trophiesNum);
            progress.appendChild(trophies);
            //progress created


            //create rank

            const rankContainer = document.createElement("div");
            rankContainer.setAttribute("class", "rank-container");


            const rank = document.createElement("div");
            rank.setAttribute("class", "rank");

            const rankImg = document.createElement("div");
            rankImg.setAttribute("class", "rank-img");


            const rankTitle = document.createElement("div");
            rankTitle.textContent = "RANK";
            rankTitle.setAttribute("class", "rank-title");


            const rankNumber = document.createElement("div");
            rankNumber.setAttribute("class", "rank-number");
            rankNumber.textContent = this.rank;


            rank.appendChild(rankImg);
            rank.appendChild(rankTitle);
            rank.appendChild(rankNumber);
            rankContainer.appendChild(rank);
            //rank created

            //append progress

            first.appendChild(progress);
            first.appendChild(rankContainer);
            //progress appened
        }

        this.element.appendChild(first);


        const second = document.createElement("div");
        second.setAttribute("class", "second");

        if (this.rarityObj.IS_IMG) {
            second.style.backgroundImage = `url('../assets/${this.rarityObj.BACKGROUND}')`;
        } else {
            second.style.backgroundColor = `#${this.rarityObj.BACKGROUND}`;
        }
        const brawlerImg = document.createElement("div");
        brawlerImg.setAttribute("class", "brawler_img");

        brawlerImg.style.backgroundImage = `url('../assets/brawler_portraits/${this.image_src}')`;


        const name = document.createElement("div");
        name.setAttribute("class", "brawler-name");
        name.textContent = this.name.toUpperCase();

        if (this.unlocked) {
            const power = document.createElement("div");
            power.setAttribute("class", "power");


            const powerTitle = document.createElement("span");
            powerTitle.setAttribute("class", "power-title");
            powerTitle.textContent = "POWER";

            const powerNum = document.createElement("span");
            powerNum.setAttribute("class", "power-num");
            powerNum.textContent = this.power;

            power.appendChild(powerTitle);
            power.appendChild(powerNum);
            second.appendChild(power);
        }


        second.appendChild(brawlerImg);
        second.appendChild(name);

        this.element.appendChild(second);


        const third = document.createElement("div");
        third.setAttribute("class", "third");

        if (this.unlocked) {
            const highestTrophies = document.createElement("div");
            highestTrophies.setAttribute("class", "highest-trophies");

            const highestTrophiesTitle = document.createElement("span");
            highestTrophiesTitle.setAttribute("class", "ht-title");
            highestTrophiesTitle.textContent = "Highest Trophies";

            const highestTrophiesNum = document.createElement("span");
            highestTrophiesNum.setAttribute("class", "ht-num");
            highestTrophiesNum.textContent = this.highestTrophies;



            highestTrophies.appendChild(highestTrophiesTitle);
            highestTrophies.appendChild(highestTrophiesNum);


            third.appendChild(highestTrophies);
        } else {
            if (this.arriving_soon) {
                const coming_soon = document.createElement("div");
                coming_soon.setAttribute("class", "coming-soon");

                const coming_soon_title = document.createElement("span");
                coming_soon_title.setAttribute("class", "cs-title");
                if (this.arriving_time) {
                    let time = setInterval(() => {
                        let counter = this.timer();
                        if (!counter) {
                            clearInterval(time);
                            this.arriving_soon = false;
                            coming_soon_title.textContent = `Arrived!`;
                        } else {
                            coming_soon_title.textContent = `Arriving in ${counter}`;
                        }
                    }, 1000);
                } else {
                    coming_soon_title.textContent = "Coming Soon...";
                }

                coming_soon.appendChild(coming_soon_title);
                third.appendChild(coming_soon);
            }
        }
        this.element.appendChild(third);
        return this;
    }

    update(obj = {}) {

        if (!this.element) {
            this.add();
        }


        const rank = this.element.querySelector(".rank-number");
        rank.textContent = this.rank;

        const progress = this.element.querySelector(".progress-fill");
        progress.style.width = this.getTrophyWidth((Math.random() * 10) + 1, 10) + "%";

        const trophiesNum = this.element.querySelector(".trophies-num");
        trophiesNum.textContent = this.trophies;

        const powerNum = this.element.querySelector(".power-num");
        powerNum.textContent = this.power;


        const highestTrophies = this.element.querySelector(".ht-num");
        highestTrophies.textContent = this.highestTrophies;
    }

    updateInfo(obj) {
        if (typeof obj != "undefined") {
            this.rank = obj.rank;
            this.trophies = obj.trophies;
            this.power = obj.power;
            this.highestTrophies = obj.highestTrophies;
        }
        if (this.milestone) {
            this.progressStart = this.milestone.ProgressStart;
            this.progress = this.milestone.Progress;
            this.progressEnd = this.progressStart + this.progress;
        } else {
            //player at the max rank with this character
            this.progressEnd = false;
        }
    }

    appendToDom(domElement) {
        return domElement.appendChild(this.element);
    }

    timer(bool = false) {
        const countDownDate = new Date(this.arriving_time).getTime();
        let returnText;
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (bool) {// Output the result in an element with id="demo"
            returnText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            if (days == 0 && hours == 0 && minutes == 0) {
                returnText = `${seconds}s`;
            } else if (days == 0 && hours == 0) {
                returnText = `${minutes}m ${seconds}s`;
            } else if (days == 0) {
                returnText = `${hours}h ${minutes}m`;
            } else {
                returnText = `${days}d ${hours}h`;
            }
        }
        // If the count down is over, return false
        if (this.hasArrived()) {
            return false;
        }
        return returnText;
    }
    hasArrived() {
        const countDownDate = new Date(this.arriving_time).getTime();
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;
        if (distance < 0) {
            this.arriving_soon = false;
            return true;
        }
    }

}
