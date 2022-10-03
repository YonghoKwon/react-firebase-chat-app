import { action, computed, makeObservable, observable } from "mobx";

class Store {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      addItem: action.bound,
      removeItem: action.bound,
      count: computed,
    });
  }

  addItem = (text) => {
    this.list.push(text);
  };

  removeItem = (index) => {
    this.list.splice(index, 1);
  };

  get getListItems() {
    return this.list;
  }

  get count() {
    return this.list.length;
  }
}

export default new Store();