import { ArrayList } from "./ArrayList.js";
export class Element {
    constructor(object = {}) {
        this._object = object;
        this._element;
        this._textNode;
        this._childNodes = new ArrayList();
    }

    createElement(){
        this._element = document.createElement(this._object.type);
        this.setAttribute();
        this.setText();
        return this;
    }

    createDiv() {
        this._element = document.createElement("div");
        this.setAttribute();
        this.setText();
        return this;
    }
    createSpan() {
        this._element = document.createElement("span");
        this.setAttribute();
        this.setText();
        return this;
    }

    setText() {
        let text = this._object.text;
        if (typeof text !== 'undefined') {
            this._textNode = document.createTextNode(text);
            this._element.append(this._textNode);
        }
    }

    setAttribute() {
        if (typeof this._object.attributes !== 'undefined') {
            let keys = Object.keys(this._object.attributes);
            keys.forEach(key => {
                this._element.setAttribute(key, this._object.attributes[key]);
            });
        }
    }

    create() {
        let elementType = this._object.type;

        switch (elementType) {
            case "div":
                return this.createDiv();
                break;
            case "span":
                return this.createSpan();
                break;
            default:
                return this.createElement();
                break;
        }
    }
    
    /**
     * Inserts the child to element of instance
     * @param child Element getting inserted
     * @returns The parent element with the child appended to it
     */
    append(child){
        if (Array.isArray(child)) {
            child.forEach(ele => {
                this._element.append(ele.element);
                this._childNodes.push(ele.element);
            });
        } else {
            this._element.append(child.element);
            this._childNodes.push(child.element);
        }
        return this._element;
    }
    /**
     * Inserts one element to the other
     * @param parent Element to insert into
     * @param child Element getting inserted
     * @returns The parent element with the child appended to it
     */
    static append(parent, child) {
        if (Array.isArray(child)) {
            child.forEach(element => {
                parent.append(element);
            });
        } else {
            parent.append(child);
        }
        return parent;
    }

    get element(){
        return this._element;
    }

    set element(element){
        return this._element = element;
    }
}