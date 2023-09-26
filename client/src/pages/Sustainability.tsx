import { Link } from "react-router-dom";

function Sustainability() {
  return (
    <div className="bg-black text-white pt-[10rem] flex flex-col items-center px-[4rem]">
      <p className="text-3xl mb-[2.5rem]">— SUSTAINABILITY —</p>
      <p className="text-center leading-8 my-[2rem]">
        La cuisine d'Hannie aims to provide an unparalleled dining experience,
        full of theatrics and flair that cannot be replicated at home. This is
        achieved through a commitment to the restaurant’s activities as a whole;
        from sourcing rare ingredients to an uncompromising approach to
        technique, service and quality. This dedication and pride have
        established La cuisine d'Hannie as one of Australia’s most exciting
        restaurants.
      </p>
      <p>
        One of the main factors in moving La cuisine d'Hannie to the Rialto in
        2011 was to improve the restaurant's carbon footprint with the latest
        kitchen technology.
      </p>
      <p className="text-center leading-8 my-[2rem]">
        In every instance possible, La cuisine d'Hannie seeks out local produce,
        manufacturers and designers. We maintain long and respected
        relationships with our suppliers, allowing us to ensure the highest
        quality and commitment to sustainable and ethical techniques.
      </p>
      <p className="text-center leading-8 my-[2rem] font-courgette w-[80%]">
        I want to be the first closed loop, zero food waste restaurant group in
        Australia. It's all about doing what we can, sustainability is a
        challenging area with many contradictions and sometime misinformation.
        Our philosophy is that we cannot sit idly by and wait for instruction,
        we should do what we can right now to help our planet. One day I hope
        that La cuisine d'Hannie can become carbon neutral and offset the energy
        that’s used everyday to put each meal on the plate. Shannon Bennett
      </p>
      <p className="text-center leading-8 my-[2rem]">
        Beyond the commitment to local produce, La cuisine d'Hannie's philosophy
        is not to sit idly by and wait for instruction, but proactively do what
        we can right now to help our planet. As such, the restaurant makes
        continually progress with its sustainability promise.
      </p>
      <img src="/images/sustainability.png" alt="Sustainability" />
      <div className="mt-[5rem]">
        <Link to="/reservations">
          <span className="text-gray-500 cursor-pointer mx-2 hover:border-b">
            Make a reservation
          </span>
        </Link>
        <span>|</span>
        <span className="text-gray-500 cursor-pointer mx-2 hover:border-b">
          Mailing list
        </span>
        <span>|</span>
        <span className="text-gray-500 cursor-pointer mx-2 hover:border-b">
          Privacy Policy
        </span>
      </div>
      <div className="mt-[1rem] mb-[2rem] font-inpiration">
        <span>
          A brand by Hannie <i className="fa-solid fa-heart"></i> Hanh
        </span>
      </div>
    </div>
  );
}

export default Sustainability;
