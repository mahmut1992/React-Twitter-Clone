import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Loader from "../../components/loader/Loader";
import Post from "../../components/post";

const List = () => {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    // koleksiyon referansı al
    const collectionRef = collection(db, "tweets");

    // sorgu ayarlarını yap
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    // koleksiyona abone ol
    const unsub = onSnapshot(q, (docs) => {
      const temp = [];
      docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setTweets(temp);
    });

    // sayfadan ayrılınca aboneliği durdur didAmmount
    return () => unsub();
  }, []);

  return !tweets ? (
    <Loader design="size-8 my-60" />
  ) : (
    tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
  );
};

export default List;
