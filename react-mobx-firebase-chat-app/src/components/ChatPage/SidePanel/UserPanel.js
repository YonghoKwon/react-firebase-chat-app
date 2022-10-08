import React, {useRef} from 'react'
import {IoIosChatboxes} from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import firebase from '../../../firebase';
import mime from 'mime-types';

import {observer} from "mobx-react";
import useStores from "../../../hooks/useStores"

function UserPanel() {
  const { userStore } = useStores();
  const inputOpenImageRef = useRef();

  const handleLogout = () => {
    firebase.auth().signOut();
  }

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  }

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    try {
      let uploadTaskSnapshot = await firebase.storage().ref()
        .child(`user_image/${userStore.user.currentUser.uid}`)
        .put(file, metadata)

      let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL
      })

      userStore.setPhotoURL(downloadURL);

      await firebase.database().ref("users")
        .child(userStore.user.currentUser.uid)
        .update({ image: downloadURL })

    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      {/* Logo */}
      <h3 style={{color: 'white'}}>
        <IoIosChatboxes/>{" "} Chat App
      </h3>

      <div style={{display: 'flex', marginBottom: '1rem'}}>
        <Image src={userStore.user.currentUser && userStore.user.currentUser.photoURL} style={{width: '30p', height: '30px', marginTop: '3px'}} roundedCircle/>

        <Dropdown>
          <Dropdown.Toggle
            style={{background: 'transparent', boder: '0px'}}
            id="dropdown-basic">
            {userStore.user.currentUser && userStore.user.currentUser.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={handleOpenImageRef}
            >
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleLogout}
            >
              로그아웃
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <input
        onChange={handleUploadImage}
        accept="image/jpeg, image/png"
        style={{display: 'none'}}
        ref={inputOpenImageRef}
        type="file"
      />

    </div>
  )
}

export default observer(UserPanel)