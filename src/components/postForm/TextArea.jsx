import React from "react";

const TextArea = () => {
  return (
    <textarea
      name="text"
      className="w-full bg-transparent mb-2 md:text-lg text-zinc-300 outline-none resize-y min-h-[40px] max-h-[300px] "
      placeholder="Neler Oluyor?"
    />
  );
};

// textarea hiç bir prop almamasına rağmen kapsayıcı componenti render olduğu için o da her defasında render oluyor çözüm react.memo

export default React.memo(TextArea);
