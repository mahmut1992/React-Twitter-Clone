import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { auth, db } from "../../firebase";

const Buttons = ({ tweet }) => {
  // aktif kullanıcı bu twiti likeladımı
  const isLikes = tweet.likes.includes(auth.currentUser.uid);
  // like butonuna basınca beğenen tekrar basınca beğeniyi çeken fonk
  const toggleLike = async () => {
    // güncellenicek olan dökümanın referansını al
    const docRef = doc(db, "tweets", tweet.id);
    // Aktif kullanıcının id sini likes diziseine ekle kaldır
    await updateDoc(docRef, {
      likes: isLikes
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex justify-between items-center text-zinc-500">
      <button className="post-icon hover:text-blue-400 hover:bg-blue-400/20 cursor-pointer">
        <FaRegComment />
      </button>
      <button className="post-icon hover:text-green-400 hover:bg-green-400/20 cursor-pointer">
        <FaRetweet />
      </button>
      <button
        onClick={toggleLike}
        className="post-icon hover:text-pink-400 hover:bg-pink-400/20 cursor-pointer flex items-center gap-2 relative"
      >
        {isLikes ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
        <span className={`absolute -end-1 ${isLikes && "text-pink-500"}`}>
          {tweet.likes.length}
        </span>
      </button>
      <button className="post-icon hover:text-blue-400 hover:bg-blue-400/20 cursor-pointer">
        <FaShareNodes />
      </button>
    </div>
  );
};

export default Buttons;
