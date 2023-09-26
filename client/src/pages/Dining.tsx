import { Link } from "react-router-dom";

const Dining: React.FC = () => {
  // ------------------------change bkg for EAT----------------------------
  const changeBackgroundEat = () => {
    const diningElement = document.getElementById("dining");
    if (diningElement) {
      diningElement.style.background =
        "url(/images/eat1.jpg) no-repeat center center/cover";
    }
  };

  const resetBackgroundEat = () => {
    const diningElement = document.getElementById("dining");
    if (diningElement) {
      diningElement.style.background =
        "url(/images/dining.jpg) no-repeat center center/cover";
    }
  };

  // ------------------------change bkg for DRINK----------------------------
  const changeBackgroundDrink = () => {
    const diningElement = document.getElementById("dining");
    if (diningElement) {
      diningElement.style.background =
        "url(/images/drink.jpg) no-repeat center center/cover";
    }
  };

  const resetBackgroundDrink = () => {
    const diningElement = document.getElementById("dining");
    if (diningElement) {
      diningElement.style.background =
        "url(/images/dining.jpg) no-repeat center center/cover";
    }
  };
  // ----------------------------------------------------------------------------
  return (
    <div id="dining" className="dining bg-black text-white pt-[10rem]">
      <div className="flex justify-center items-center gap-[6rem] mt-[4rem]">
        <Link to="/eat">
          <div
            onMouseOver={changeBackgroundEat}
            onMouseOut={resetBackgroundEat}
            className="eat text-[4.5rem]"
          >
            EAT
          </div>
        </Link>
        <Link to="/drink">
          <div
            onMouseOver={changeBackgroundDrink}
            onMouseOut={resetBackgroundDrink}
            className="drink text-[4.5rem]"
          >
            DRINK
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dining;
