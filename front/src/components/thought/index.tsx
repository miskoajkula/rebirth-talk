import React from 'react';
import { BsChatQuote } from "react-icons/bs";

const Thought = () => {
  return (
    <div>
      <div className={"thought"}>
        <p>
          <BsChatQuote className="w-64 h-60 rounded-full"/>
          <span>
            Your self-worth is determined by you. You don't have to depend on someone telling you who you are.
            </span>
        </p>
      </div>
    </div>
  );
};

export default Thought;
