import {action, computed, makeObservable, observable} from "mobx";

class userStore {
  user = {
    currentUser: null,
    isLoading: true
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
      // removeItem: action.bound,
      getUser: computed,
    });
  }

  get getUser() {
    return this.user;
  }

  setUser = (user) => {
    this.user = {
      currentUser: user,
      isLoading: false
    }
  }



}

export default userStore;