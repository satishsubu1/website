import { ArrayList } from "./ArrayList.js";
import { Brawler } from "./Brawler.js";

export class Brawlers {

    constructor(brawlers, rarities) {
        this.createDivs();
        this.allBrawlers = new ArrayList();
        this.totalBrawlers = new ArrayList();
        this.unlockedBrawlers = new ArrayList();
        this.arrivingBrawlers = new ArrayList();

        this.createBrawlerObjects(brawlers, rarities);
        this.total = this.totalBrawlers.length;
        this.count = 0;
        this.rarities = rarities;

    }
    //function to sort by id
    idSort(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }
    //function to sort by rarity
    raritySort(a, b) {
        if (a.rarityObj.VALUE < b.rarityObj.VALUE) {
            return -1;
        }
        if (a.rarityObj.VALUE > b.rarityObj.VALUE) {
            return 1;
        }
        return 0;
    }
    trophySort(a, b) {
        if (a.trophies > b.trophies) {
            return -1;
        }
        if (a.trophies < b.trophies) {
            return 1;
        }
        return 0;
    }
    //sorts by id (need to be called on every sorting)
    sortById() {
        this.totalBrawlers.sort(this.idSort);
        this.unlockedBrawlers.sort(this.idSort);
        this.arrivingBrawlers.sort(this.idSort);
    }
    //sort by rarity
    sort(fu) {
        this.sortById();
        this.totalBrawlers.sort(fu);
        this.unlockedBrawlers.sort(fu);
        this.arrivingBrawlers.sort(fu);
        this.addBrawlersToDom();

    }
    //sort by rarity descending
    sortByRarity() {
        this.sort(this.raritySort);
    }
    sortByRarityDesc() {
        this.sortByRarity();
        this.totalBrawlers.reverse();
        this.unlockedBrawlers.reverse();
        this.arrivingBrawlers.reverse();
        this.addBrawlersToDom();
    }
    sortByTrophies() {
        this.sort(this.trophySort);
    }

    loadMilestones(milestones){
        this.milestones = milestones;
    }
    //create divs(grid) to hold the brawlers
    createDivs() {
        this.remainingDiv = document.createElement("div");
        this.remainingDiv.setAttribute("class", "brawlers-remaining-div");

        this.remainingElement = document.createElement("div");
        this.remainingElement.setAttribute("class", "brawlers-remaining");

        this.unlockedDiv = document.createElement("div");
        this.unlockedDiv.setAttribute("class", "brawlers-unlocked-div");

        this.unlockedElement = document.createElement("div");
        this.unlockedElement.setAttribute("class", "brawlers-remaining");

        this.unlockedDiv.append(this.unlockedElement);
        this.remainingDiv.append(this.remainingElement);

        document.body.append(this.unlockedDiv);
        document.body.append(this.remainingDiv);
    }


    updateBrawlerList(brawlers) {
        brawlers.forEach(brawler => {
            const found = this.totalBrawlers.find(o => o.id === brawler.id);
            if (found) {
                found.unlocked = true;
                let brawlerMilestone = this.milestones.find(o => o.Name === `goal_1_${brawler.rank - 1}`);
                found.loadMilestone(brawlerMilestone);
                found.updateInfo(brawler);

                this.unlockedBrawlers.push(this.totalBrawlers.remove(found));
            }
        });

        this.count = this.unlockedBrawlers.length;
    }

    createBrawlerObjects(brawlers, rarities = {}) {
        brawlers.forEach(brawler => {
            const brawlerObj = new Brawler(brawler);
            let brawlerRarity = rarities.find(o => o.RARITY === brawlerObj.rarity);
            brawlerObj.loadRarity(brawlerRarity);

            if (!brawlerObj.disabled && !brawlerObj.arriving_soon) {
                this.totalBrawlers.push(brawlerObj);
            } else if (!brawlerObj.disabled && brawlerObj.arriving_soon) {
                this.arrivingBrawlers.push(brawlerObj);
            }
        });

    }

    addBrawlersToDom() {
        let remainingTitleElement = document.getElementById("remaining-title");
        let unlockedTitleElement = document.getElementById("unlocked-title");

        if (!remainingTitleElement) {
            remainingTitleElement = document.createElement('h2');
            remainingTitleElement.setAttribute("id", "remaining-title");
        }
        if (this.total !== 0 && this.count !== 0) {
            remainingTitleElement.textContent = "Remaining Brawlers";
        } else if (this.total !== 0 && this.count == 0) {
            remainingTitleElement.textContent = "Brawlers";
        }
        this.remainingDiv.prepend(remainingTitleElement);

        if (this.count !== 0) {
            if (!unlockedTitleElement) {
                unlockedTitleElement = document.createElement('h2');
                unlockedTitleElement.setAttribute("id", "unlocked-title");
                unlockedTitleElement.textContent = `Unlocked Brawlers (${this.count}/${this.total})`;
                this.unlockedDiv.prepend(unlockedTitleElement);
            }
        }
        this.totalBrawlers.forEach(brawler => {
            brawler.createAndAdd(this.remainingElement);
        });
        this.arrivingBrawlers.forEach(brawler => {
            this.arrivingBrawlers[0].timer();
            brawler.createAndAdd(this.remainingElement);
        });
        this.unlockedBrawlers.forEach(brawler => {
            brawler.createAndAdd(this.unlockedElement);
        });
    }
}