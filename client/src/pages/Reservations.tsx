import { Link } from "react-router-dom";
import ReservationSlide from "../components/ReservationSlide";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalReservation from "../components/ModalReservation";
import { notification } from "antd";

export interface Menu {
  menuId: string;
  image: string;
  menuName: string;
  price: number;
  uploadDate: string;
  menuStatus: string;
}

function Reservations() {
  const getDate = new Date();
  const convertedDate = getDate.toISOString().slice(0, 10);

  const [guests, setGuests] = useState<number | null>(null);
  const [diningDate, setDiningDate] = useState<string | null>(null);
  const [diningTime, setDiningTime] = useState<string | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);

  //Get all menus from database:
  const [menus, setMenus] = useState<Menu[]>([]);

  const getAllMenus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/menu");
      const findAvailableMenus = response.data.filter(
        (item: Menu) => item.menuStatus === "available"
      );
      setMenus(findAvailableMenus);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMenus();
  }, []);

  useEffect(() => {
    if (guests && guests < 2) {
      setArea("bar");
    } else if (guests && guests >= 2 && guests <= 5) {
      setArea("table");
    } else if (guests && guests > 5 && guests <= 10) {
      setArea("table");
    } else {
      setArea(null);
    }
  }, [guests]);

  //Open modal find a table:
  const [openModalFindATable, setOpenModalFindATable] = useState(false);
  //open modal:
  const handleOpenModalFindATable = () => {
    if (!guests || !diningDate || !diningTime || !menu || !area) {
      notification.error({
        message: "Please choose all options!",
      });
      return;
    } else {
      setOpenModalFindATable(true);
    }
  };

  //Close modal:
  const handleCloseModalFindATable = (): any => {
    setOpenModalFindATable(false);
  };

  return (
    <>
      {openModalFindATable ? (
        <ModalReservation
          handleCloseModalFindATable={handleCloseModalFindATable}
          guests={guests}
          diningDate={diningDate}
          diningTime={diningTime}
          menu={menu}
          area={area}
          menus={menus}
        />
      ) : (
        <></>
      )}
      <div className="bg-black text-white pt-[10rem] flex flex-col justify-center px-[4rem]">
        <p className="text-4xl text-center mb-[2.5rem]">
          — MAKE A RESERVATION —
        </p>

        <ReservationSlide />

        <p className="text-center leading-8 my-[2rem]">
          We offer our signature Chef’s Tasting Menu priced from $450 per
          person, a menu led by the chef, produce and seasons. Reservations are
          essential. La cuisine d'Hannie will be closing to undergo exciting
          renovations from late August until the end of September. We will
          therefore not be accepting reservations during this period.
          Reservations are currently open through to 22nd August. If you would
          like to be notified when October bookings are set to open online,
          please kindly email our Reservations Team &nbsp;
          <Link to="/contact">
            <span className="text-gray-400">HERE</span>
          </Link>
          .
        </p>
        <p className="text-center">
          Dietary requirements can be accommodated if notified at the time of
          booking.
        </p>
        <p className="text-center leading-8 my-[2rem]">
          Cancellation Policy: <br /> We require 24-hours notice for reduction
          in numbers to your party size or cancellation. Failure to do so will
          incur a cancellation fee equivalent to the minimum menu price per
          person. Please note that any date changes that happen within the 24
          hour period will incur the same cancellation fee.
        </p>
        <div className="w-[90%] bg-[rgba(153,153,153,.15)] my-[2rem] text-black mx-auto">
          <>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-8 my-[2rem]">
                <select
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="py-2 px-3 outline-none w-[11rem]"
                >
                  <option value="">Number of Guest</option>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5 people</option>
                  <option value="6">6 people</option>
                  <option value="7">7 people</option>
                  <option value="8">8 people</option>
                  <option value="9">9 people</option>
                  <option value="10">10 people</option>
                </select>
                <input
                  className="py-[.45rem] px-3 outline-none w-[11rem]"
                  type="date"
                  onChange={(e) => setDiningDate(e.target.value)}
                  min={convertedDate}
                  max="2023-09-30"
                />
                <select
                  onChange={(e) => setDiningTime(e.target.value)}
                  className="py-2 px-3 outline-none w-[11rem]"
                >
                  <option value="">-- Choose time --</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="09:30 PM">09:30 PM</option>
                </select>
                <select
                  onChange={(e) => setMenu(e.target.value)}
                  className="py-2 px-3 outline-none w-[11rem]"
                >
                  <option value="">- Choose a menu -</option>
                  {menus.map((menu) => (
                    <option key={menu.menuId} value={menu.menuId}>
                      {menu.menuName}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => setArea(e.target.value)}
                  className="py-2 px-3 outline-none w-[11rem]"
                >
                  {guests && guests < 2 && (
                    <>
                      <option value="bar">Bar</option>
                    </>
                  )}
                  {guests && guests >= 2 && guests <= 5 && (
                    <>
                      <option value="table">Table</option>
                    </>
                  )}
                  {guests && guests > 5 && guests <= 10 && (
                    <>
                      <option value="table">Table</option>
                      <option value="room">Private room</option>
                    </>
                  )}
                </select>
              </div>
              <button
                onClick={handleOpenModalFindATable}
                className="w-[13rem] py-[.5rem] px-[3rem] text-white font-semibold border-2 border-white mb-8 hover:bg-white hover:text-black"
              >
                FIND A TABLE
              </button>
            </div>
          </>
        </div>
        <div className="border-b border-[#3d3b3b] mt-[2rem] mb-[3.5rem] w-[75%] mx-auto"></div>
        <div className="mt-[3rem] mx-auto">
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
        <div className="mt-[1rem] mb-[2rem] font-inpiration mx-auto">
          <span>
            A brand by Hannie <i className="fa-solid fa-heart"></i> Hanh
          </span>
        </div>
      </div>
    </>
  );
}

export default Reservations;
