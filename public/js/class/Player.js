
import { Brawlers } from "./Brawlers.js";

export class Player{
    constructor(data){
        this._lastUpdate = data.backUpTime;
        
        this._tag = data.tag;
        this._name = data.name;
        this._icon = data.icon;
        this._nameColor = data.nameColor;
        this._trophies = data.trophies;
        this._expLevel = data.expLevel;
        this._expPoints = data.expPoints;
        this._highTrophies = data.highestTrophies;
        this._powerPlayPoints = data.powerPlayPoints;
        this._highestPowerPlayPoints = data.highestPowerPlayPoints;
        this._soloVictories = data.soloVictories;
        this._duoVictories = data.duoVictories;
        this._teamVictories = data["3vs3Victories"];
        this._bestRoboRumble = data.bestRoboRumbleTime;
        this._bestBigBrawler = data.bestTimeAsBigBrawler;
        this._clubJson = data.club;
        this.loadPlayerBrawlers(data.brawlers);
    }

    loadPlayerBrawlers(brawlers){
        this.brawlers.updateBrawlerList(brawlers);
    }

    loadGeneralBrawlers(characters, rarities){
        this.brawlers = new Brawlers(characters, rarities);
    }

    loadBrawlerMilestones(milestones){
        this.brawlers.loadMilestones(milestones);
    }

    addBrawlersToDom(){
        this.brawlers.addBrawlersToDom();
    }
};