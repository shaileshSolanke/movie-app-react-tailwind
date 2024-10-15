import React, { useState } from "react";

function Cast({ actor }) {
  const [castLoading, setCastLoading] = useState(true);
  const img_base_path = "https://image.tmdb.org/t/p/w500";

  function handleCastLoading() {
    setCastLoading(false);
  }

  return (
    <div className="relative rounded-3xl overflow-hidden sm:text-xl md:text-2xl">
      <div className=" bg-blue-green text-prussian-blue font-mono text-center">
        <img
          src={
            actor.profile_path
              ? `${img_base_path}${actor.profile_path}`
              : `assets/profile.svg`
          }
          alt={`${actor.name}-pic`}
          className={
            castLoading
              ? "w-full aspect-2/3 animate-pulse bg-prussian-blue"
              : "w-full aspect-2/3"
          }
          onLoad={handleCastLoading}
        />
      </div>
      <div className="absolute bottom-0 w-full h-full flex items-center justify-center flex-col bg-blue-green text-prussian-blue px-2 text-center opacity-0 hover:opacity-90 transition">
        <p className="font-bold">{actor.name}</p>
        <p>{actor.character}</p>
      </div>
    </div>
  );
}

export default Cast;
