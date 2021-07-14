import { Api } from "./Api.js";
import { ArrayList } from "./built_in_classes/ArrayList.js";
import { PlayerCharacters } from "./PlayerCharacters.js";
export class Player {

    constructor(playerTag) {
        this._promises = new ArrayList();

        this._tag = playerTag.replace("#", "");

        this._api = new Api(`/api/player/${this._tag}`);

        this._paramObj;
        this._backUpTime;
        this._name;
        this._nameColor;
        this._trophies;
        this._expLevel;
        this._expPoints;
        this._highTrophies;
        this._powerPlayPoints;
        this._highestPowerPlayPoints;
        this._soloVictories;
        this._duoVictories;
        this._teamVictories;
        this._bestRoboRumble;
        this._bestBigBrawler;

        this._iconObj;
        this._brawlersObj;
        this._clubObj;

        //load other classes
        this._characters;
    }
    load() {
        this._characters = new PlayerCharacters();

        return new Promise((resolve, reject) => {
            this._api.get().catch(err => {
                return reject({
                    error: true,
                    place: 'player',
                    desc: 'Player Not Found',
                    response: err.response
                });
            });
            this._promises.push(this._api.promise);
            this._promises.push(this._characters.load());

            Promise.all(this._promises).then(data => resolve(data)).catch(err => reject(err));
        })
    }

    populate() {
        this._paramObj = this._api.response;
        let player = this._paramObj;

        this._backUpTime = player.backUpTime;
        this._name = player.name;
        this._nameColor = player.nameColor;
        this._trophies = player.trophies;
        this._expLevel = player.expLevel;
        this._expPoints = player.expPoints;
        this._highTrophies = player.highTrophies;
        this._highestPowerPlayPoints = player.highestPowerPlayPoints;
        this._soloVictories = player.soloVictories;
        this._duoVictories = player.duoVictories;
        this._teamVictories = player.teamVictories;
        this._bestRoboRumble = player.bestRoboRumble;
        this._bestBigBrawler = player.bestBigBrawler;

        this._iconObj = player.icon;
        this._brawlersObj = player.brawlers;
        this._clubObj = player.club;

        this.populateCharacters();
    }

    populateCharacters() {
        this._characters.paramObj = this._brawlersObj;
        this._characters.populateArrays();
        this._characters.sortByRarity();
    }

    addToDOM() {
        document.body.append(this._characters.addToDOM().element);
    }

}

// let player = new Player('#82JJVPRUL');

// player.load().then(() => {
//     player.populate();
//     player.addToDOM();
// }).catch(err => {
//     console.log(err);
//     alert(err.desc);
// })