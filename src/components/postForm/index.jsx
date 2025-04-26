import React, { useRef, useState } from "react";
import UserAvatar from "./UserAvatar";
import TextArea from "./TextArea";
import FormActions from "./FormActions";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Preview from "./Preview";
import uploadToStorage from "../../firebase/uploadToStorage";

const PostForm = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  // resim yüklenmeden önceki ön izleme
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();
  // resmin önizleme url oluşturan fonksiyon
  const omImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  // form gönderilince  çalışan fonk
  const handleSubmit = async (e) => {
    e.preventDefault();
    // inputlarda ki text ve image verilerini al
    const text = e.target.text.value;
    const file = e.target.image.files[0];
    if (!text.trim() && !file)
      return toast.warning("Litfen içeriği belirleyiniz");
    // twiti koleksiyone ekle
    try {
      setIsLoading(true);
      // resim varsa firebase storage e yükle ve url al
      const url = await uploadToStorage(file);

      // tweets koleksiyonunun referansını al
      const collectionRef = collection(db, "tweets");
      // yeni twit belgesini koleksiyone ekle
      await addDoc(collectionRef, {
        content: { text: text || null, image: url || null },
        isEdited: false,
        likes: [],
        createdAt: serverTimestamp(),
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
      // Formu sıfırla
      e.target.reset();
      setPreview(null);
    } catch (error) {
      toast.error("Bir Hata Oluştu");
    } finally {
      setIsLoading(false);
    }
  };
  // önizlenen resmi kaldıran iptal eden fonc

  const clearImage = () => {
    // önizleme state ini sıfırla
    setPreview(null);
    // file inputun value sini de temizle
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className="border-b border-tw-gray p-4 flex gap-3">
      <UserAvatar photo={user?.photoURL} name={user?.displayName} />
      <form onSubmit={handleSubmit} className="w-full pt-1">
        <TextArea />
        <Preview isLoading={isLoading} src={preview} clearImage={clearImage} />
        <FormActions
          isLoading={isLoading}
          fileRef={fileRef}
          omImageChange={omImageChange}
        />
      </form>
    </div>
  );
};

export default PostForm;
