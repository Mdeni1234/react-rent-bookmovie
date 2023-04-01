import { useContext, useState } from "react";
import { RentalContext } from "../RentalLayout";

const BookContent = (props) => {
  let { item } = props;
  return (
    <iframe
      src="https://drive.google.com/file/d/0B1HXnM1lBuoqMzVhZjcwNTAtZWI5OS00ZDg3LWEyMzktNzZmYWY2Y2NhNWQx/view?usp=sharing&resourcekey=0-5DqnTtXPFvySMiWstuAYdA"
      width="100%"
      height="100%"
      allow="autoplay"
    ></iframe>
  );
};

export default BookContent;
