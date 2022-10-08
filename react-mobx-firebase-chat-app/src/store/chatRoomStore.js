import {action, computed, makeObservable, observable} from "mobx";
import userStore from "./userStore";

class chatRoomStore {
  chatRoom = {
    currentChatRoom: null,
    isPrivateChatRoom: false,
  }

  constructor() {
    makeObservable(this, {
      chatRoom: observable,
      setCurrentChatRoom: action,
      setPrivateChatRoom: action,
      getChatRoom: computed,
    });
  }

  get getChatRoom() {
    return this.chatRoom;
  }

  setCurrentChatRoom = (currentChatRoom) => {
    this.chatRoom = {
      ...this.chatRoom,
      currentChatRoom: currentChatRoom
    };
  }

  setPrivateChatRoom = (isPrivateChatRoom) => {
    this.chatRoom = {
      ...this.chatRoom,
      isPrivateChatRoom: isPrivateChatRoom
    };
  }

}

export default chatRoomStore;