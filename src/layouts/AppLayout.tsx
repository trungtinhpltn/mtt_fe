/* eslint-disable camelcase */
import React from "react";
import Nav from "./Nav";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <div className="bg-colorcs-6de9c4">
        <div className="mx-auto max-w-[768px] w-full relative">
          <Nav />
          <main className="relative min-h-screen bg-white pt-[60px]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
