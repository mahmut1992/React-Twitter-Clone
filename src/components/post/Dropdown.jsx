import React, { useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import EditModal from "../modal/EditModal";

const Dropdown = ({ tweet }) => {
  const [isOpen, setIsOpen] = useState(false);
  // tweet i gönderen kişi ile şua oturumu açık olan kişinin id si aynı mı
  const isOwn = tweet.user.id === auth.currentUser.uid;
  // dökumanı sil
  const handleDelete = () => {
    if (!confirm("Silmek istediğinizden emin misiniz ?")) return;

    // silinecek elemanın referansını al
    const docRef = doc(db, "tweets", tweet.id);

    deleteDoc(docRef).then(() => toast.info("Tweet akıştan kaldırıldı"));
  };
  const checkboxRef = useRef();
  return (
    isOwn && (
      <>
        <label className="popup">
          <input ref={checkboxRef} type="checkbox" />
          <div className="burger" tabIndex={0}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="popup-window">
            <legend>Eylemler</legend>
            <ul>
              <hr />

              <li>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    checkboxRef.current.checked = false;
                  }}
                >
                  <MdEdit />
                  <span>Düzenle</span>
                </button>
              </li>
              <hr />
              <li>
                <button onClick={handleDelete}>
                  <MdDelete className="text-red-500" />
                  <span>Sil</span>
                </button>
              </li>
            </ul>
          </nav>
        </label>
        <EditModal
          isOpen={isOpen}
          tweet={tweet}
          close={() => setIsOpen(false)}
        />
      </>
    )
  );
};

export default Dropdown;
