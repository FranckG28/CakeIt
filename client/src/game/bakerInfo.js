import { useState } from "react";

export default function BakerInfo(props) {

  return (
    <article className="rounded-xl bg-success p-8 flex flex-row align-center items-center gap-3 text-white">

      <img
          className="mask mask-circle w-20"
          src="https://api.lorem.space/image/shoes?w=160&h=160"
          alt="Avatar"
        />

      <div className="grow flex flex-col">
          <h6 className="font-light">{props.date}</h6>
          <h2 className="text-3xl font-bold">{props.name}</h2>
      </div>

      <div className="flex flex-col justify-end text-right">

          <p className="text-sm font-light">trésorerie</p>
          <p className="text-3xl font-light">{props.money + " €"}</p>

      </div>
  
    </article>
  );
}
