import { Link } from "react-router-dom";
import { Image } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

export interface Menu {
  menuId: string;
  menuName: string;
  menuPrice: number;
  image: string;
  menuStatus: string;
  uploadDate: string;
}

const Eat: React.FC = () => {
  const [allMenu, setAllMenu] = useState<Menu[]>([]);

  //Get all menus:
  const getAllMenu = async () => {
    try {
      const response = await axios.get("http://localhost:3001/menu");
      //Find available menus:
      const availableMenu = response.data.filter(
        (item: Menu) => item.menuStatus === "available"
      );
      setAllMenu(availableMenu);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllMenu();
  }, []);

  console.log("get all menus in eat-->", allMenu);

  return (
    <div className=" bg-black text-white pt-[10rem] flex flex-col items-center px-[4rem]">
      <p className="text-5xl mb-[2.5rem]">— EAT —</p>
      <img src="/images/eat2.jpg" alt="eat2" />
      <p className="text-center leading-8 my-[2rem]">
        La cuisine d'Hannie is a testament to the belief that dining can be a
        wondrous and unforgettable experience. The ever-changing Chef's Menu
        pays homage to classical fine dining in a modern context by exploring
        the beauty of native Australian ingredients. While in the past the menu
        looked to Europe for inspiration, Executive Chef, Hugh Allen, continues
        to celebrate the unparalleled quality of home-grown produce with
        thoughtfully considered dishes committed to seasonality and locality.
      </p>
      <p className="text-center leading-8 mb-[2rem]">
        Guests can indulge in our signature Chef's Tasting Menu priced from $450
        per person.
      </p>
      <div className="flex justify-around gap-[3rem] mb-7">
        {allMenu.map((item) => (
          <div className="flex flex-col justify-center items-center">
            <div
              key={item.menuId}
              className="w-[7rem] mb-[1rem] cursor-pointer"
            >
              <Image src={item.image} alt={`Image of ${item.menuName}`} />
            </div>
            <span className="border-2 px-4 py-1 text-sm">{item.menuName}</span>
          </div>
        ))}
      </div>
      <Link to="/reservations">
        <button className="py-[1rem] px-[2rem] font-bold border-2 border-white mb-8 hover:bg-white hover:text-black">
          MAKE A RESERVATION
        </button>
      </Link>
      <div className="border-b border-[#3d3b3b] mt-[2rem] mb-[7rem] w-[75%]"></div>
      <div>
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

export default Eat;
