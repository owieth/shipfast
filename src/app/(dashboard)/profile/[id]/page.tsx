import React from "react";

const page = ({ params: { id } }: { params: { id: String } }) => {
  console.log(id);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <h1>Profile ID: {id}</h1>
    </div>
  );
};

export default page;
