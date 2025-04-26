import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from ".";
import { v4 } from "uuid";

const uploadToStorage = async (file) => {
  // dosya yoksa veya dosya resim değilse fonk durdur
  if (!file || !file.type.startsWith("image")) return null;
  if (file.size > 2000000) {
    toast.error("Lütfen 2 mb altında bir dosya seçin");
    throw new Error("Medya içeriği sınırı aşıyor");
  }
  // dosyanın yükleneceği konumun referansını al

  const imageRef = ref(storage, v4() + file.name);

  // referansını oluşturduğumuz konuma dosyayı yükle
  await uploadBytes(imageRef, file);
  // storage yüklenen dosyanın url al ve döndür
  const url = await getDownloadURL(imageRef);
  return url;
};

export default uploadToStorage;
