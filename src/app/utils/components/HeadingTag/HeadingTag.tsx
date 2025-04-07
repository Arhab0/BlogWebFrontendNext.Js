import React from "react";

interface Props {
  heading: string;
}

const HeadingTag = ({ heading }: Props) => {
  return (
    <div>
      <h4 className="text-xl font-medium font-barlow mb-6 ">{heading}</h4>
    </div>
  );
};

export default HeadingTag;
