import { Link } from "react-router-dom";
import { Image } from "antd";

const Drink: React.FC = () => {
  return (
    <div className="bg-black text-white pt-[10rem] flex flex-col items-center px-[4rem]">
      <p className="text-5xl mb-[2.5rem]">— WINE —</p>
      <p className="text-center leading-8 my-[2rem]">
        At La cuisine d'Hannie, our commitment to providing a dining experience
        that is greater than the sum of its parts sees an intrinsic commitment
        to the service of wine and the development of a culture that supports
        this. Like the food ingredients that we use, we look for wines that are
        true to their origin and reflective of the environment in which they
        have been made.
      </p>
      <p>
        La cuisine d'Hannie is proud to be the only restaurant in the world to
        have two Master Sommeliers in Dorian Guillon and Carlos Santos Simoes.
      </p>
      <div className="flex justify-around items-center gap-10 my-[2rem]">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="mb-3 object-cover cursor-pointer"
            width={103}
            src="/menu/winelist.png"
            alt="wine list"
          />
          <span className="border-2 px-2 text-sm">Wine list</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            className="mb-3 cursor-pointer"
            src="/menu/certi.jpg"
            alt="wine certification"
          />
          <span className="border-2 px-2 text-sm">Wine award</span>
        </div>
      </div>
      <img className="my-[3rem]" src="/images/wine.png" alt="wine" />
      <div className="border-b border-[#3d3b3b] mt-[2rem] mb-[3.5rem] w-[75%]"></div>
      <p className="text-5xl mb-[2.5rem]">— TEA PAIRING —</p>
      <p className="text-center leading-8 my-[2rem]">
        With its beautifully layered aromas and complexity of flavours, tea has
        a natural affinity to complement and enhance cuisine. At La cuisine
        d'Hannie our approach to tea emulates that of a sommelier’s to wine. We
        undertake a dedicated acquisition model to source unique leaves and
        blends from specialist tea houses, with a focus on discovering rare and
        exclusive teas from around the world. Exhibiting a thoughtfully
        selected, impeccably prepared suite of teas, the tea pairing explores
        tensions within carbonated, blended, cold, and warm tea infusions to
        complement the arc of the menu. The tea pairing is charged at $130 per
        person
      </p>
      <Link to="/reservations">
        <button className="py-[1rem] px-[2rem] font-bold border-2 border-white mb-8 hover:bg-white hover:text-black">
          MAKE A RESERVATION
        </button>
      </Link>
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
};

export default Drink;
