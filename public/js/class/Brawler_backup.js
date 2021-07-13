/**
 * Example class
**/
export class Brawler {
    constructor(brawler = {}) {
        this.unlocked = false;
        this.brawlerId = brawler.id;
        this.brawlerName = brawler.name;
        this.brawlerTrophies = brawler.trophies;
        this.brawlerRank = brawler.rank;
        this.brawlerPower = brawler.power;
        this.brawlerHt = brawler.highestTrophies;
        this.starpowers;
        this.gadgets;
    }

    add() {
        const brawler = document.getElementById(this.brawlerId);

        if (brawler === null) {
            this.createAndAdd();
        } else {
            this.brawler = brawler;
            this.update();
        }
        return this;
    }

    createAndAdd(domElement) {
        this.create().appendToDom(domElement);
    }

    create() {
        this.brawler = document.createElement("div");
        this.brawler.setAttribute("class", "brawler");
        this.brawler.setAttribute("id", this.brawlerId);
        this.brawler.setAttribute("data-name", this.brawlerName);

        const first = document.createElement("div");
        first.setAttribute("class", "first");



        //Create Progress
        const progress = document.createElement("div");
        progress.setAttribute("class", "progress");


        const progressFill = document.createElement("div");
        progressFill.setAttribute("class", "progress-fill");
        //progressFill.style.width = this.getTrophyWidth(Math.random(), 1) + "%";

        const trophies = document.createElement("div");
        trophies.setAttribute("class", "trophies");


        const trophiesNum = document.createElement("div");
        trophiesNum.setAttribute("class", "trophies-num");
        trophiesNum.textContent = this.brawlerTrophies;



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
        rankNumber.textContent = this.brawlerRank;


        rank.appendChild(rankImg);
        rank.appendChild(rankTitle);
        rank.appendChild(rankNumber);
        rankContainer.appendChild(rank);
        //rank created

        //append progress

        first.appendChild(progress);
        first.appendChild(rankContainer);
        //progress appened
        this.brawler.appendChild(first);


        const second = document.createElement("div");
        second.setAttribute("class", "second");

        const brawlerImg = document.createElement("div");
        brawlerImg.setAttribute("class", "brawler_img");

        brawlerImg.style.backgroundImage = `url('../assets/brawler_portraits/${this.brawlerId}.png')`;


        const name = document.createElement("div");
        name.setAttribute("class", "brawler-name");
        name.textContent = this.brawlerName.toUpperCase();

        const power = document.createElement("div");
        power.setAttribute("class", "power");


        const powerTitle = document.createElement("span");
        powerTitle.setAttribute("class", "power-title");
        powerTitle.textContent = "POWER";

        const powerNum = document.createElement("span");
        powerNum.setAttribute("class", "power-num");
        powerNum.textContent = this.brawlerPower;



        power.appendChild(powerTitle);
        power.appendChild(powerNum);
        second.appendChild(brawlerImg);
        second.appendChild(name);
        second.appendChild(power);

        this.brawler.appendChild(second);


        const third = document.createElement("div");
        third.setAttribute("class", "third");

        const highestTrophies = document.createElement("div");
        highestTrophies.setAttribute("class", "highest-trophies");

        const highestTrophiesTitle = document.createElement("span");
        highestTrophiesTitle.setAttribute("class", "ht-title");
        highestTrophiesTitle.textContent = "Highest Trophies";

        const highestTrophiesNum = document.createElement("span");
        highestTrophiesNum.setAttribute("class", "ht-num");
        highestTrophiesNum.textContent = this.brawlerHt;



        highestTrophies.appendChild(highestTrophiesTitle);
        highestTrophies.appendChild(highestTrophiesNum);


        third.appendChild(highestTrophies);
        this.brawler.appendChild(third);
        return this;
    }

    update() {

        if (!this.brawler) {
            this.add();
        }


        const rank = this.brawler.querySelector(".rank-number");
        rank.textContent = this.brawlerRank;

        const progress = this.brawler.querySelector(".progress-fill");
        progress.style.width = this.getTrophyWidth((Math.random() * 10) + 1, 10) + "%";

        const trophiesNum = this.brawler.querySelector(".trophies-num");
        trophiesNum.textContent = this.brawlerTrophies;

        const powerNum = this.brawler.querySelector(".power-num");
        powerNum.textContent = this.brawlerPower;


        const highestTrophies = this.brawler.querySelector(".ht-num");
        highestTrophies.textContent = this.brawlerHt;
    }

    appendToDom(domElement) {
        return domElement.appendChild(this.brawler);
    }
}
