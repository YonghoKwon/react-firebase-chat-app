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

  setPhotoURL = (url) => {
    this.user.currentUser = {
      ...this.user.currentUser,
      photoURL: url
    }
  }

  clearUser = () => {
    this.user = {
      currentUser: null,
      isLoading: false
    }
  }
}

export default userStore;