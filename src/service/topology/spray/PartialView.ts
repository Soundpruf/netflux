"use strict"

export class PartialView extends Array {
  constructor() {
    super();
  }

  /**
  * Returns the oldest arc in the partial view
  *
  * @return {Array<number>} the oldest arc [peerId: number, age: number]
  */
  get oldest (): Array<number> {
    if (this.length <= 0) {
      throw new Error("Empty partial view");
    }
    return this[0];
  }

  /**
  * Adds a node with the age of 0 to the partial view
  *
  * @param {number} peerId
  * @param {number} age
  */
  add (peerId: number, age:number = 0): void {
    this.push([peerId, age]);
  }

  /**
  * Returns the index of an arc in the partial view
  * -1 if not in the partial view
  *
  * @param {number} peerId
  * @param {number} age
  * @return {number} index of the arc in the partial view
  */
  private _indexArc (peerId: number, age: number): number {
    for (let i = 0; i < this.length; i++) {
      let elem = this[i];
      if (elem[0] == peerId && elem[1] == age) {
        return i;
      }
    }
    return -1;
  }

  /**
  * Removes a node from the partial view
  *
  * @param {number} peerId
  * @param {number} age
  */
  remove (peerId: number, age: number): void {
    let index = this._indexArc(peerId, age);
    if (index >= 0) {
      this.splice(index, 1);
    }
  }

  /**
  * Increments the age of each arc
  */
  incrementAge (): void {
    for (let i = 0; i < this.length; i++) {
      this[i][1]++;
    }
  }

}