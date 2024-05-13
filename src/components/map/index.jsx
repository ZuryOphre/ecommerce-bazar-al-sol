import React from "react";
import Image from "next/image";

const Map = () => {
  const handleOpenMaps = () => {
    window.open(
      `https://www.google.com/maps/place/Bazar+y+Yerberia+Al+Sol/@-33.4087003,-71.148182,17z/data=!3m1!4b1!4m6!3m5!1s0x9662f5e74f63daf5:0x9fad4b456a213529!8m2!3d-33.4087048!4d-71.1456071!16s%2Fg%2F11t9wlbpbc?entry=ttu`
    );
  };

  return (
    <div className="flex flex-col items-center mb-10">
      <h1 className="text-negro font-semibold text-center text-3xl mt-10 mb-4">
        Encuentranos en Av Ambrosio O'higgins 501, Curacaví, Chile.
      </h1>
      <div className="flex justify-center">
        <Image
          src="/map.png"
          alt="ubicacion Bazar Al Sol"
          width={800}
          height={400}
        />
      </div>
      <button
        onClick={handleOpenMaps}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cómo llegar
      </button>
    </div>
  );
};

export default Map;
