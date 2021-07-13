export class ArrayList extends Array{
    constructor(){
        super();
    }
    /**
     * Removes and returns the element from an array
     * @param element The element to be removed and returned 
     * @returns The element that gets removed. Undefined if the element is not in array
     */
    remove(element){
        let indexOfElement = this.indexOf(element);

        if(typeof indexOfElement == undefined){
            return undefined;//returns undefined if the element is not in the array
        }
        return this.splice(indexOfElement, 1).shift();//removes and returns the element
    }
    
}