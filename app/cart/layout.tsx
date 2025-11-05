
import { Header as NavHeader } from "@/components/home-page/header"

import React from "react";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      {/* <Header /> */}
      <NavHeader alwaysBlurred={true} />
      <main className="flex-1 h-full w-full flex justify-center items-center bg-[url('/images/checkout-bg.svg')] bg-cover bg-center bg-repeat bg-fixed">
        {children}
      </main>
    </div>
  );
};

export default CartLayout;
