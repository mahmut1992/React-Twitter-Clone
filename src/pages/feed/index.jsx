import React from "react";
import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { useOutletContext } from "react-router-dom";

const Feed = () => {
  const user = useOutletContext();

  return (
    <div className="h-screen bg-primary  text-secondary grid grid-cols-[1fr_minmax(300px,600px)_1fr]">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
