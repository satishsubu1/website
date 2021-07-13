import { Characters } from "./Characters.js";
import { ArrayList } from "./built_in_classes/ArrayList.js";
import { Element } from "./built_in_classes/Element.js";
import { Api } from "./Api.js";
import { PlayerCharacter } from "./character_classes/PlayerCharacter.js";

export class PlayerCharacters extends Characters {
    /**
     * Creates a Player Charaters class that stores all of Player Character classes
     * @param {object} characters The characters data in an array(Optional)
     */
    constructor(characters) {
        super();
        this._paramObj = characters;

        this._rankApi = new Api("/api/csv/ranks");
        this._milestonesApi = new Api("/api/csv/csv_logic/milestones");


        this._unlockedCharacters = new ArrayList();
        this._remainingCharacters = new ArrayList();
        this._arrivingCharacters = new ArrayList();

        //count of the characters
        this._totalUnlocked;
        this._totalRemaining;
        this._totalArriving;
        this._totalPossible;

        //characters DOM
        this._trophiesOption = new Element({ type: "option", text: "Trophies", attributes: { value: "trophies", class: "sort-option" }, parent: this._sortSelectElement });
        this._trophiesDescOption = new Element({ type: "option", text: "Trophies Desc", attributes: { value: "trophiesDesc", class: "sort-option" }, parent: this._sortSelectElement });
        this._powerOption = new Element({ type: "option", text: "Power", attributes: { value: "power", class: "sort-option" }, parent: this._sortSelectElement });
        this._highestTrophiesOption = new Element({ type: "option", text: "Highest Trophies", attributes: { value: "highestTrophies", class: "sort-option" }, parent: this._sortSelectElement });

        this._unlockedCharactersElement = new Element({ type: "div", class: "characters-unlocked-container", parent: this.element });
        this._remainingCharactersElement = new Element({ type: "div", class: "characters-remaining-container", parent: this.element });
        this._arrivingCharactersElement = new Element({ type: "div", class: "characters-arriving-container", parent: this.element });
        this._unlockedTitleElement = new Element({ type: "div", class: "characters-unlocked-title", parent: this._unlockedCharactersElement });
        this._remainingTitleElement = new Element({ type: "div", class: "characters-remaining-title", parent: this._remainingCharactersElement });
        this._arrivingTitleElement = new Element({ type: "div", class: "characters-arriving-title", parent: this._arrivingCharactersElement });
        this._unlockedElement = new Element({ type: "div", class: "characters-unlocked", parent: this._unlockedCharactersElement });
        this._remainingElement = new Element({ type: "div", class: "characters-remaining", parent: this._remainingCharactersElement });
        this._arrivingElement = new Element({ type: "div", class: "characters-arriving", parent: this._arrivingCharactersElement });
    }

    load() {
        super.load();
        this._promises.push(this._rankApi.get());
        this._promises.push(this._milestonesApi.get());
        return Promise.all(this._promises);
    }

    addToDOM() {
        this.addTitles();
        this._allCharactersElement.element.remove();//remove the element created by super.addToDOM()

        this._unlockedCharacters.forEach(character => {
            this._unlockedElement.append(character.create());
        });
        this._remainingCharacters.forEach(character => {
            this._remainingElement.append(character.create());
        });
        this._arrivingCharacters.forEach(character => {
            this._arrivingElement.append(character.create());
        });
        return this._element;
    }

    addTitles() {
        if (this._unlockedCharacters.length !== 0) {
            this._unlockedTitleElement.text = `Unlocked Brawlers (${this._totalUnlocked}/ ${this._totalPossible})`;
        }

        if (this._remainingCharacters.length !== 0) {
            this._remainingTitleElement.text = `Remaining Brawlers (${this._totalRemaining})`;
        }

        if (this._arrivingCharacters.length !== 0) {
            this._arrivingTitleElement.text = `Arriving Brawlers (${this._totalArriving})`;
        }
    }
    populateArrays() {
        super.populateArrays();
        this._remainingCharacters = this._characters.slice();

        this._paramObj.forEach(obj => {
            let char = this._remainingCharacters.find(o => o.id == obj.id);
            if (char) {
                this._remainingCharacters.remove(char);
                let object = Object.assign(char._paramObj, obj);
                object.rankObj = this._rankApi.response;
                object.milestonesObj = this.getMilestone(obj);
                let character = new PlayerCharacter(object);
                this._unlockedCharacters.push(character);
            }
        });
        this.arrivingCheck();
        this.calculateTotals();
    }
    permormSort(val) {
        super.permormSort(val);
        switch (val) {
            case "trophies":
                this.sortByTrophies();
                this.addToDOM();
                break;
            case "trophiesDesc":
                this.sortByTrophiesDesc();
                this.addToDOM();
                break;
            case "power":
                this.sortByPower();
                this.addToDOM();
                break;
            case "highestTrophies":
                this.sortByHighestTrophies();
                this.addToDOM();
                break;
            default:
                break;
        }
    }
    trophiesSort(a, b) {
        if (a.trophies < b.trophies) {
            return 1;
        }
        if (a.trophies > b.trophies) {
            return -1;
        }
        return 0;
    }
    trophiesDescSort(a, b) {
        if (a.trophies < b.trophies) {
            return -1;
        }
        if (a.trophies > b.trophies) {
            return 1;
        }
        return 0;
    }
    
    powerSort(a, b){
        if (a.power < b.power) {
            return 1;
        }
        if (a.power > b.power) {
            return -1;
        }
        return 0;
    }

    highestTrophiesSort(a, b) {
        if (a.highestTrophies < b.highestTrophies) {
            return 1;
        }
        if (a.highestTrophies > b.highestTrophies) {
            return -1;
        }
        return 0;
    }

    sortById() {
        super.sortById();
        this._unlockedCharacters = this._unlockedCharacters.sort(this.idSort);
        this._remainingCharacters = this._remainingCharacters.sort(this.idSort);
        this._arrivingCharacters = this._arrivingCharacters.sort(this.idSort);
    }

    sortByRarity() {
        super.sortByRarity();
        this._unlockedCharacters = this._unlockedCharacters.sort(this.raritySort);
        this._remainingCharacters = this._remainingCharacters.sort(this.raritySort);
        this._arrivingCharacters = this._arrivingCharacters.sort(this.raritySort);
    }

    sortByRarityDesc() {
        super.sortByRarityDesc();
        this._unlockedCharacters = this._unlockedCharacters.sort(this.rarityDescSort);
        this._remainingCharacters = this._remainingCharacters.sort(this.rarityDescSort);
        this._arrivingCharacters = this._arrivingCharacters.sort(this.rarityDescSort);
    }

    sortByTrophies() {
        this.sortById();
        this._unlockedCharacters = this._unlockedCharacters.sort(this.trophiesSort);
    }

    sortByTrophiesDesc() {
        this.sortById();
        this._unlockedCharacters = this._unlockedCharacters.sort(this.trophiesDescSort);
    }

    sortByPower(){
        this.sortById();
        this._unlockedCharacters = this._unlockedCharacters.sort(this.powerSort);
    }

    sortByHighestTrophies() {
        this.sortById();
        this._unlockedCharacters = this._unlockedCharacters.sort(this.highestTrophiesSort);
    }

    arrivingCheck() {
        //need to loop backwards (When removing element the loop skips over an element)
        for (let i = this._remainingCharacters.length - 1; i >= 0; i--) {
            let character = this._remainingCharacters[i];
            if (character.arriving_soon) {
                this._arrivingCharacters.push(character);
                this._remainingCharacters.remove(character);
            }
        }
    }
    calculateTotals() {
        super.calculateTotals();
        this._totalUnlocked = this._unlockedCharacters.length;
        this._totalRemaining = this._remainingCharacters.length;
        this._totalArriving = this._arrivingCharacters.length;
        this._totalPossible = this._totalUnlocked + this._totalRemaining;
    }

    getMilestone(character) {
        return this._milestonesApi.response.find(o => o.Name == `goal_1_${character.rank - 1}`);
    }

    get totalUnlocked() {
        return this._totalUnlocked;
    }
    get totalPossible() {
        return this._totalPossible;
    }
    get totalRemaining() {
        return this._totalRemaining;
    }
    get totalArriving() {
        return this._totalArriving;
    }
    set paramObj(obj) {
        this._paramObj = obj;
    }
}



// const characters = new PlayerCharacters();
// characters.load();



// async function loadPlayer(tag) {
//     tag = tag.replace("#", "");
//     const player = new Api(`/api/player/${tag}`);
//     const data = await player.get();

//     console.log(data);
//     const characterObj = await data.brawlers;
//     characters.paramObj = await characterObj;
//     //can only run these characters methods after the data is received from the server
//     await characters.loaded().then(() => {
//         characters.populateArrays();
//         characters.sortByRarity();
//         characters.addToDOM();
//         document.body.append(characters.element.element);
//     })
// }

// loadPlayer("#82JJVPRUL");
// // // 9YVLJU9RR