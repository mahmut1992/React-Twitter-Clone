import React from "react";

const Content = ({ data }) => {
  if (typeof data !== "object" || data === null) return null;

  return (
    <div className="my-2">
      {typeof data.text === "string" && <p>{data.text}</p>}
      {typeof data.image === "string" && (
        <img src={data.image} alt="tweet" className="rounded-xl my-2" />
      )}
    </div>
  );
};

export default Content;
