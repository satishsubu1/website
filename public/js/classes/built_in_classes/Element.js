import { ArrayList } from "./ArrayList.js";
export class Element {
    constructor(object = {}) {
        this._object = object;
        this._parent;
        this._element;
        this._textNode;
        this._childElements = new ArrayList();

        this.create();
    }

    createElement() {
        this._element = document.createElement(this._object.type || 'div');
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
        } else {
            let elementClass = this._object.class;
            let elementId = this._object.id;

            if (typeof elementClass !== 'undefined') {
                this._element.setAttribute("class", elementClass);
            }
            if (typeof elementId !== 'undefined') {
                this._element.setAttribute("id", elementId);
            }
        }
    }

    create() {
        if (!this.created()) {
            let elementType = this._object.type;
            switch (elementType) {
                case "div":
                    this.createDiv();
                    break;
                case "span":
                    this.createSpan();
                    break;
                default:
                    this.createElement();
                    break;
            }

            this.addParent();
            this.addChilds();
        }
    }
    created(){
        if(typeof this._element !== 'undefined'){
            return true;
        }
        return false;
    }
    addParent() {
        if (this.hasParent()) {
            if (typeof this._object.addType !== "undefined" && this._object.addType == 'prepend') {
                this._object.parent.prepend(this);
            } else {
                this._object.parent.append(this);
            }
        }
    }

    addChilds() {
        if (this.hasChilds()) {
            let childs = this._object.childs;
            childs.forEach(child => {
                this._childElements.push(new Element(child));
            });
        }
    }

    hasParent() {
        let parent = this._object.parent;

        if (typeof parent !== 'undefined') {
            return true;
        }
        return false;
    }

    hasChilds() {
        let childs = this._object.childs;

        if (typeof childs !== 'undefined') {
            return true;
        }
        return false;
    }

    /**
     * Inserts the child to element of instance
     * @param child Element getting inserted
     * @returns The parent element with the child appended to it
     */
    append(child) {
        if (Array.isArray(child)) {
            child.forEach(ele => {
                this._element.append(ele.element);
                this._childElements.push(ele);
            });
        } else {
            this._element.append(child.element);
            this._childElements.push(child);
        }
        return this._element;
    }

    prepend(child) {
        if (Array.isArray(child)) {
            child.forEach(ele => {
                this._element.prepend(ele.element);
                this._childElements.unshift(ele);
            });
        } else {
            this._element.prepend(child.element);
            this._childElements.unshift(child);
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

    get element() {
        return this._element;
    }

    set element(element) {
        return this._element = element;
    }

    set text(text) {
        if (typeof this._textNode == 'undefined') {
            this._textNode = document.createTextNode(text);
            this._element.append(this._textNode);
        } else {
            this._textNode.textContent = text;
        }
    }

    get text() {
        return this._textNode.textContent;
    }
}