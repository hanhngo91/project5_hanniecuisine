import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="bg-black text-white pt-[10rem] flex flex-col items-center px-[4rem]">
      <p className="text-4xl mb-[2.5rem]">— WELCOME TO LA CUISINE D'HANNIE —</p>
      <p className="mb-[2.5rem] text-center leading-8">
        La cuisine d'Hannie has been synonymous with Melbourne dining for over
        20 years, continuing to present beautiful food that not only appeals to
        a sense of luxury, but honesty, integrity and an inherent natural
        flavour. The focus has, and always will be, to present an exciting and
        dynamic experience with progression of flavours and sense of curiosity.
      </p>
      <p className="mb-[2.5rem] text-center leading-8">
        In the year 2000, Chef Shannon Bennett opened La cuisine d'Hannie from a
        quirky terrace building in Drummond Street, Carlton. In 2005, the
        restaurant relocated to the historic Normanby Chambers in Melbourne’s
        central business district. Evolving from a classical French style
        restaurant with a niche following, the move signified a shift in
        direction, with a focus on the theatrical and the dedication to dining
        as an experience. It was the move to the new premises that La cuisine
        d'Hannie achieved widespread critical acclaim and international
        recognition, including a then unprecedented 19/20 from The Age Good Food
        Guide.
      </p>
      <p className="mb-[2.5rem] text-center leading-8">
        In June 2011, La cuisine d'Hannie relocated to the 55th floor of
        Melbourne’s iconic Rialto building, with sweeping views of Melbourne’s
        cityscape.
      </p>
      <div className="flex justify-around gap-8 items-center w-full mb-[2rem]">
        <img
          className="w-[35rem] h-[25rem] object-cover"
          src="/images/drink.jpg"
          alt="about1"
        />
        <img
          className="w-[35rem] h-[25rem] object-cover"
          src="/images/about2.jpg"
          alt="about2"
        />
      </div>
      <div className="border-b border-[#3d3b3b] my-[2.5rem] w-[75%]"></div>
      {/* ----------------------------------------OUR TEAM---------------------------------------------- */}
      <p className="text-4xl mb-[2.5rem]">— OUR TEAM —</p>
      <img src="/images/dream.jpg" alt="our team" />
      <div className="border-b border-[#3d3b3b] my-[3.5rem] w-[75%]"></div>
      {/* ---------------------------------------------------------------------------------------------- */}
      <p className="text-center text-xl mb-[1.5rem]">
        — HUGH ALLEN - EXECUTIVE CHEF —
      </p>
      <div className="flex justify-around gap-8">
        <div className="">
          <img className="" src="/images/chef1.jpg" alt="chef1" />
        </div>
        <div>
          <p className="mb-[2.5rem] leading-8 text-justify">
            Hugh had a desire to be a chef from a young age, cutting his teeth
            as an Apprentice Chef with the Rockpool Group at just 15 years old,
            learning and developing his fundamental skills. He joined the
            kitchen team at La cuisine d'Hannie two years later as a stagiaire,
            and quickly made an impression on his peers and the wider restaurant
            industry.
          </p>
          <p className="mb-[2.5rem] text-justify leading-8">
            At 18 years of age, he was awarded the coveted 2015 Gault Millau
            Young Chef of the Year Award, which took him across the globe and
            the opportunity to stage at several three Michelin Star restaurants
            in Paris.
          </p>
          <p className="mb-[2.5rem] text-justify leading-8">
            He spent three invaluable years at La cuisine d'Hannie before the
            allure of further overseas experience presented itself, with
            Scandinavia at the top of his list. In 2016, he joined Rene
            Redzepi’s Noma, awarded two-Michelin Stars and four-time winner of
            the World’s Best Restaurant award. Hugh worked with Redzepi for
            close to three years, including the original Noma both the 2016
            Sydney pop-up and 2018 Mexico pop-up and part of the opening team of
            Noma 2.0 which provided an unparalleled experience in working with
            native ingredients, techniques and cultures.
          </p>
        </div>
      </div>
      <p className="mb-[2.5rem] text-center leading-8">
        Hugh returned to Melbourne in late 2018 as Vue Group Sous Chef, but it
        wasn’t long before the top job awaited him Level 55. In early 2019, he
        was promoted to Executive Chef of La cuisine d'Hannie. His time spent in
        both modern and classic kitchens has a large influence over his cooking
        style, being both refined and inventive in its use of unique, local and
        native ingredients.
      </p>
      <div className="border-b border-[#3d3b3b] my-[2.5rem] w-[75%]"></div>
      {/* ------------------------------------------------------------------------------------------------- */}
      <p className="mb-[2.5rem] text-center text-xl">
        — HUGO SIMÕES SANTOS - GENERAL MANAGER —
      </p>
      <div className="flex justify-around items-center gap-9 w-[90%]">
        <div>
          <p className="mb-[2.5rem] text-justify leading-8">
            Raised in the small town of Fátima in Portugal, Hugo began working
            in restaurants from a very young age. His passion quickly evolved to
            something more serious, and after several years of hospitality
            studies, Hugo saw himself working in some of the world's finest
            dining institutions. After impressive stints at Gordon Ramsay and
            Dinner by Heston in London, Hugo made the move to Melbourne,
            inspired by the city’s dining culture, and Australia’s wonderful
            produce.
          </p>
          <p className="mb-[2.5rem] text-justify leading-8">
            “One of my biggest passions in life is that of great cuisine, and
            the enjoyment I get from hosting and entertaining others
            experiencing the same is the biggest satisfaction of all.”
          </p>
        </div>
        <div className="w-full">
          <img className="w-[20rem]" src="/images/chef2.png" alt="chef2" />
        </div>
      </div>
      <div className="mt-[2.5rem]">
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

export default About;
