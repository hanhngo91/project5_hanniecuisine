import { useState, useEffect } from "react";
import { Modal } from "antd";
import { Menu } from "../pages/Reservations";
import { notification, Image } from "antd";
import axios from "axios";

export interface Reservations {
  reservationId?: string;
  customerName: string;
  email: string;
  tel: string;
  guests: number;
  diningDate: string;
  diningTime: string | null;
  area: string;
  total: number | null;
  points?: number;
  discountPercentage?: number | null | undefined;
  menu: Menu[];
}

export interface Customers {
  customerId: string;
  customerName: string;
  email: string;
  tel: string;
  points: number;
}

const ModalReservation = ({
  handleCloseModalFindATable,
  guests,
  diningDate,
  diningTime,
  menu,
  area,
  menus,
}: {
  handleCloseModalFindATable: () => void;
  guests: number;
  diningDate: string | null;
  diningTime: string | null;
  menu: string | null;
  area: string | null;
  menus: Menu[];
}) => {
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservations[]>([]);

  //Area is bar, table or room:
  const isBar = area === "bar";
  const isTable = area === "table";
  const isRoom = area === "room";

  //Time is 05:00 PM, 06:30 PM, 08:00 PM or 09:30 PM:
  const is05PM = "05:00 PM";
  const is0630PM = "06:30 PM";
  const is08PM = "08:00 PM";
  const is0930PM = "09:30 PM";

  //Find menu in menus:
  const findMenu = menus.find((item) => item?.menuId === menu)!;
  const foundMenu = findMenu.image!;

  //Count total price:
  const subTotal = guests * findMenu?.price;

  //VAT:
  const vatOnPrice = subTotal * 0.1;

  //Service On Price:
  const serviceOnPrice = subTotal * 0.05;

  //Get all customers:
  const [allCustomers, setAllCustomers] = useState([]);
  const getAllCustomers = async () => {
    const response = await axios.get("http://localhost:3001/customer");
    setAllCustomers(response.data);
  };
  useEffect(() => {
    getAllCustomers();
  }, []);

  //Reservation form:
  const [reservationForm, setReservationForm] = useState({
    customerName: "",
    email: "",
    tel: "",
    guests: guests,
    diningDate: diningDate,
    diningTime: diningTime,
    area: area,
    discountPercentage: 0,
    total: 0,
    menu: menu,
  });

  //Find customer:
  const [foundCustomer, setFoundCustomer] = useState<Customers[] | undefined>(
    []
  );
  const findCustomer = () => {
    const foundCustomer = allCustomers?.find(
      (item) =>
        item.customerName === reservationForm?.customerName &&
        item.email === reservationForm?.email &&
        item.tel === reservationForm?.tel
    );
    setFoundCustomer(foundCustomer);
  };

  //Find customer's points:
  const [customerPoints, setCustomerPoints] = useState(0);
  const findCustomerPoints = () => {
    const customerPoints = foundCustomer?.points;
    setCustomerPoints(customerPoints);
  };

  useEffect(() => {
    findCustomer();
    findCustomerPoints();
  }, [reservationForm]);

  //Find customer's discount percent based on customerPoints:
  const [discountPercent, setDiscountPercent] = useState(0);
  const findDiscountPercent = () => {
    if (customerPoints < 5) {
      setDiscountPercent(0);
    } else if (customerPoints >= 5 && customerPoints < 10) {
      setDiscountPercent(3);
    } else if (customerPoints >= 10 && customerPoints < 20) {
      setDiscountPercent(5);
    } else if (customerPoints >= 20 && customerPoints < 30) {
      setDiscountPercent(7);
    } else if (customerPoints >= 30) {
      setDiscountPercent(10);
    }
  };
  useEffect(() => {
    findDiscountPercent();
  }, [customerPoints]);

  //Total price:
  const findTotalPrice = () => {
    const tempPrice = subTotal + vatOnPrice + serviceOnPrice;
    const discount = tempPrice * (discountPercent / 100);
    const totalPrice = tempPrice - discount;
    setReservationForm({
      ...reservationForm,
      total: Number(totalPrice.toFixed(2)),
      discountPercentage: discountPercent,
    });
  };

  useEffect(() => {
    findTotalPrice();
  }, [subTotal, vatOnPrice, serviceOnPrice, discountPercent]);

  console.log("guests--> ", guests);
  console.log("diningDate--> ", diningDate);
  console.log("diningTime--> ", diningTime);
  console.log("menu--> ", menu);
  console.log("area--> ", area);
  console.log("menus--> ", menus);

  //Change area to uppercase:
  const changeArea = area?.toLocaleUpperCase();

  //Get value from input:
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservationForm({ ...reservationForm, [name]: value });
  };

  //Modal:
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = (): void => {
    handleCloseModalFindATable();
  };

  //Get all reservations:
  const getAllReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/reservation`);
      setReservations(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllReservations();
  }, []);

  //Count all guests and rooms at 05:00 PM:
  const findTableOnDate1 = reservations.filter((reservation) => {
    return (
      reservation.diningDate === diningDate &&
      reservation.diningTime === "05:00 PM" &&
      reservation.area === area
    );
  });
  const totalGuests1 = findTableOnDate1.reduce(
    (acc, curr) => acc + curr.guests,
    0
  );
  // console.log("totalGuests1 at 05:00 PM--> ", totalGuests1);

  const totalRooms1 = () => {
    let count = 0;
    findTableOnDate1.forEach((reservation) => {
      if (reservation.area === "room") {
        count++;
      }
    });
    return count;
  };
  // console.log("totalRooms1 at 05:00 PM--> ", totalRooms1());

  //Count all guests and rooms at 06:30 PM:
  const findTableOnDate2 = reservations.filter((reservation) => {
    return (
      reservation.diningDate === diningDate &&
      reservation.diningTime === "06:30 PM" &&
      reservation.area === area
    );
  });
  const totalGuests2 = findTableOnDate2.reduce(
    (acc, curr) => acc + curr.guests,
    0
  );
  // console.log("totalGuests2 at 06:30 PM--> ", totalGuests2);

  const totalRooms2 = () => {
    let count = 0;
    findTableOnDate2.forEach((reservation) => {
      if (reservation.area === "room") {
        count++;
      }
    });
    return count;
  };
  // console.log("totalRooms2 at 06:30 PM--> ", totalRooms2());

  //Count all guests and rooms at 08:00 PM:
  const findTableOnDate3 = reservations.filter((reservation) => {
    return (
      reservation.diningDate === diningDate &&
      reservation.diningTime === "08:00 PM" &&
      reservation.area === area
    );
  });
  const totalGuests3 = findTableOnDate3.reduce(
    (acc, curr) => acc + curr.guests,
    0
  );
  // console.log("totalGuests3 at 08:00 PM--> ", totalGuests3);

  const totalRooms3 = () => {
    let count = 0;
    findTableOnDate3.forEach((reservation) => {
      if (reservation.area === "room") {
        count++;
      }
    });
    return count;
  };
  // console.log("totalRooms3 at 08:00 PM--> ", totalRooms3());

  //Count all guests and rooms at 9:30 PM:
  const findTableOnDate4 = reservations.filter((reservation) => {
    return (
      reservation.diningDate === diningDate &&
      reservation.diningTime === "09:30 PM" &&
      reservation.area === area
    );
  });
  const totalGuests4 = findTableOnDate4.reduce(
    (acc, curr) => acc + curr.guests,
    0
  );
  // console.log("totalGuests4 at 09:30 PM--> ", totalGuests4);

  const totalRooms4 = () => {
    let count = 0;
    findTableOnDate4.forEach((reservation) => {
      if (reservation.area === "room") {
        count++;
      }
    });
    return count;
  };
  // console.log("totalRooms4 at 9:30 PM--> ", totalRooms4());

  //Check bar, table, room is fully booked at all time:
  const [barAt05PM, setBarAt05PM] = useState(false);
  const [barAt0630PM, setBarAt0630PM] = useState(false);
  const [barAt0800PM, setBarAt0800PM] = useState(false);
  const [barAt0930PM, setBarAt0930PM] = useState(false);

  const [tableAt05PM, setTableAt05PM] = useState(false);
  const [tableAt0630PM, setTableAt0630PM] = useState(false);
  const [tableAt0800PM, setTableAt0800PM] = useState(false);
  const [tableAt0930PM, setTableAt0930PM] = useState(false);

  const [roomAt05PM, setRoomAt05PM] = useState(false);
  const [roomAt0630PM, setRoomAt0630PM] = useState(false);
  const [roomAt0800PM, setRoomAt0800PM] = useState(false);
  const [roomAt0930PM, setRoomAt0930PM] = useState(false);

  const checkBar = () => {
    if (isBar && totalGuests1 === 10 && is05PM) {
      setBarAt05PM(true);
    } else if (isBar && totalGuests2 === 10 && is0630PM) {
      setBarAt0630PM(true);
    } else if (isBar && totalGuests3 === 10 && is08PM) {
      setBarAt0800PM(true);
    } else if (isBar && totalGuests4 === 10 && is0930PM) {
      setBarAt0930PM(true);
    }
  };

  const checkTable = () => {
    if (isTable && totalGuests1 === 50 && is05PM) {
      setTableAt05PM(true);
    } else if (isTable && totalGuests2 === 50 && is0630PM) {
      setTableAt0630PM(true);
    } else if (isTable && totalGuests3 === 50 && is08PM) {
      setTableAt0800PM(true);
    } else if (isTable && totalGuests4 === 50 && is0930PM) {
      setTableAt0930PM(true);
    }
  };

  const checkRoom = () => {
    if (isRoom && totalRooms1() === 3 && is05PM) {
      setRoomAt05PM(true);
    }
    if (isRoom && totalRooms2() === 3 && is0630PM) {
      setRoomAt0630PM(true);
    }
    if (isRoom && totalRooms3() === 3 && is08PM) {
      setRoomAt0800PM(true);
    }
    if (isRoom && totalRooms4() === 3 && is0930PM) {
      setRoomAt0930PM(true);
    }
  };

  useEffect(() => {
    checkBar();
    checkTable();
    checkRoom();
  }, [reservations]);

  console.log("barAt05PM--> ", barAt05PM);
  console.log("barAt0630PM--> ", barAt0630PM);
  console.log("barAt0800PM--> ", barAt0800PM);
  console.log("barAt0930PM--> ", barAt0930PM);
  console.log("tableAt05PM--> ", tableAt05PM);
  console.log("tableAt0630PM--> ", tableAt0630PM);
  console.log("tableAt0800PM--> ", tableAt0800PM);
  console.log("tableAt0930PM--> ", tableAt0930PM);
  console.log("roomAt05PM--> ", roomAt05PM);
  console.log("roomAt0630PM--> ", roomAt0630PM);
  console.log("roomAt0800PM--> ", roomAt0800PM);
  console.log("roomAt0930PM--> ", roomAt0930PM);

  console.log("reservationForm--> ", reservationForm);

  //Check empty input in reservation form:
  const checkEmptyInput = (): boolean => {
    if (
      !reservationForm.customerName ||
      !reservationForm.email ||
      !reservationForm.tel
    ) {
      return true;
    }
    return false;
  };

  //Handle submit form reservation:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkEmptyInput()) {
      notification.warning({
        message: "Please complete your reservation form!",
      });
      return;
    } else if (roomAt05PM && reservationForm.diningTime === "05:00 PM") {
      notification.warning({
        message: "We are fully booked at 05:00 PM. Please choose another time!",
      });
      return;
    } else if (roomAt0630PM && reservationForm.diningTime === "06:30 PM") {
      notification.warning({
        message: "We are fully booked at 06:30 PM. Please choose another time!",
      });
      return;
    } else if (roomAt0800PM && reservationForm.diningTime === "08:00 PM") {
      notification.warning({
        message: "We are fully booked at 08:00 PM. Please choose another time!",
      });
      return;
    } else if (roomAt0930PM && reservationForm.diningTime === "09:30 PM") {
      notification.warning({
        message: "We are fully booked at 09:30 PM. Please choose another time!",
      });
      return;
    } else if (tableAt05PM && reservationForm.diningTime === "05:00 PM") {
      notification.warning({
        message: "We are fully booked at 05:00 PM. Please choose another time!",
      });
      return;
    } else if (tableAt0630PM && reservationForm.diningTime === "06:30 PM") {
      notification.warning({
        message: "We are fully booked at 06:30 PM. Please choose another time!",
      });
      return;
    } else if (tableAt0800PM && reservationForm.diningTime === "08:00 PM") {
      notification.warning({
        message: "We are fully booked at 08:00 PM. Please choose another time!",
      });
      return;
    } else if (tableAt0930PM && reservationForm.diningTime === "09:30 PM") {
      notification.warning({
        message: "We are fully booked at 09:30 PM. Please choose another time!",
      });
      return;
    } else if (barAt05PM && reservationForm.diningTime === "05:00 PM") {
      notification.warning({
        message: "We are fully booked at 05:00 PM. Please choose another time!",
      });
      return;
    } else if (barAt0630PM && reservationForm.diningTime === "06:30 PM") {
      notification.warning({
        message: "We are fully booked at 06:30 PM. Please choose another time!",
      });
      return;
    } else if (barAt0800PM && reservationForm.diningTime === "08:00 PM") {
      notification.warning({
        message: "We are fully booked at 08:00 PM. Please choose another time!",
      });
      return;
    } else if (barAt0930PM && reservationForm.diningTime === "09:30 PM") {
      notification.warning({
        message: "We are fully booked at 09:30 PM. Please choose another time!",
      });
      return;
    } else {
      try {
        await axios.post(`http://localhost:3001/reservation`, reservationForm);
        Modal.success({
          content: <img src="/thanks.png" alt="thank you card" />,
        });
        getAllReservations();
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (err: any) {
        console.log("Error when booking--> ", err.response.data.message);
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        footer={null}
        style={{
          top: 60,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="mt-[1.5rem] text-2xl flex justify-center items-center font-semibold">
          FIND A {isRoom || isTable ? changeArea : "SEAT AT BAR"} ON &nbsp;
          <span className="underline">{diningDate}</span>
          &nbsp; FOR {guests} GUESTS
        </div>
        <>
          {(isRoom && totalRooms1() === 3 && diningTime === "05:00 PM") ||
          (isRoom && totalRooms2() === 3 && diningTime === "06:30 PM") ||
          (isRoom && totalRooms3() === 3 && diningTime === "08:00 PM") ||
          (isRoom && totalRooms4() === 3 && diningTime === "09:30 PM") ||
          (isTable && totalGuests1 === 50 && diningTime === "05:00 PM") ||
          (isTable && totalGuests1 === 50 && diningTime === "06:30 PM") ||
          (isTable && totalGuests1 === 50 && diningTime === "08:00 PM") ||
          (isTable && totalGuests1 === 50 && diningTime === "09:30 PM") ||
          (isBar && totalGuests1 === 10 && diningTime === "05:00 PM") ||
          (isBar && totalGuests1 === 10 && diningTime === "06:30 PM") ||
          (isBar && totalGuests1 === 10 && diningTime === "08:00 PM") ||
          (isBar && totalGuests1 === 10 && diningTime === "09:30 PM") ? (
            <>
              <div className="my-[1rem] flex justify-center items-center text-red-600">
                No {area} available at {diningTime}. Please choose another time!
              </div>
              <form onSubmit={handleSubmit}>
                <div className="my-[1rem] flex justify-center items-center">
                  {/* --------------------------5:00 PM------------------------- */}

                  {roomAt05PM || tableAt05PM || barAt05PM ? (
                    <>
                      <input
                        id="500"
                        name="diningTime"
                        value="05:00 PM"
                        type="radio"
                        className="hidden"
                        checked={false}
                      />
                      <label
                        htmlFor="500"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        05:00 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "05:00 PM" ? (
                        <>
                          <input
                            id="500"
                            name="diningTime"
                            value="05:00 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                            checked
                          />
                          <label
                            htmlFor="500"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            05:00 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="500"
                            name="diningTime"
                            value="05:00 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="500"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            05:00 PM
                          </label>
                        </>
                      )}
                    </>
                  )}

                  {/* <!-- -------------------06:30 PM--------------------- --> */}
                  {roomAt0630PM || tableAt0630PM || barAt0630PM ? (
                    <>
                      <input
                        id="630"
                        name="diningTime"
                        value="06:30 PM"
                        type="radio"
                        className="hidden"
                        checked={false}
                      />
                      <label
                        htmlFor="630"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        06:30 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "06:30 PM" ? (
                        <>
                          <input
                            id="630"
                            name="diningTime"
                            value="06:30 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                            checked
                          />
                          <label
                            htmlFor="630"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            06:30 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="630"
                            name="diningTime"
                            value="06:30 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="630"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            06:30 PM
                          </label>
                        </>
                      )}
                    </>
                  )}

                  {/* <!-- ---------------------08:00 PM------------------------ --> */}
                  {roomAt0800PM || tableAt0800PM || barAt0800PM ? (
                    <>
                      <input
                        id="800"
                        name="diningTime"
                        value="08:00 PM"
                        type="radio"
                        className="hidden"
                        checked={false}
                      />
                      <label
                        htmlFor="800"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        08:00 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "08:00 PM" ? (
                        <>
                          <input
                            id="800"
                            name="diningTime"
                            value="08:00 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                            checked
                          />
                          <label
                            htmlFor="800"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            08:00 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="800"
                            name="diningTime"
                            value="08:00 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="800"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            08:00 PM
                          </label>
                        </>
                      )}
                    </>
                  )}

                  {/* <!-- -----------------09:30 PM--------------------- --> */}
                  {roomAt0930PM || tableAt0930PM || barAt0930PM ? (
                    <>
                      <input
                        id="930"
                        name="diningTime"
                        value="09:30 PM"
                        type="radio"
                        className="hidden"
                        checked={false}
                      />
                      <label
                        htmlFor="930"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        09:30 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "09:30 PM" ? (
                        <>
                          <input
                            id="930"
                            name="diningTime"
                            value="09:30 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                            checked
                          />
                          <label
                            htmlFor="930"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            09:30 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="930"
                            name="diningTime"
                            value="09:30 PM"
                            type="radio"
                            className="hidden"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="930"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            09:30 PM
                          </label>
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* -----------------------------RESERVATION FORM----------------------------- */}
                <div>
                  <div className="flex justify-center items-center text-xl font-medium bg-rose-100 py-[1rem]">
                    COMPLETE YOUR RESERVATION
                  </div>
                  <div className="flex justify-around items-end my-[1rem]">
                    <table>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Customer Name</label>
                        </td>
                        <td className="text-lg">
                          <input
                            className="px-2 py-1"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            name="customerName"
                            value={reservationForm.customerName}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Email</label>
                        </td>
                        <td className="text-lg">
                          <input
                            className="px-2 py-1"
                            type="text"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            name="email"
                            value={reservationForm.email}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Tel</label>
                        </td>
                        <td className="text-lg">
                          <input
                            className="px-2 py-1"
                            type="text"
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                            name="tel"
                            value={reservationForm.tel}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Guests</label>
                        </td>
                        <td className="text-lg">
                          <span className="px-2 py-1">{guests}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Dining Date</label>
                        </td>
                        <td className="text-lg">
                          <span className="px-2 py-1">{diningDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Dining Time</label>
                        </td>
                        <td className="text-lg">
                          {reservationForm.diningTime === diningTime ? (
                            <span className="px-2 py-1 text-red-500">
                              Choose another time
                            </span>
                          ) : (
                            <span className="px-2 py-1">
                              {reservationForm.diningTime}
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Area</label>
                        </td>
                        <td className="text-lg">
                          <span className="px-2 py-1">{area}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Menu</label>
                        </td>
                        <td>
                          <div className="w-[2.5rem] mx-2 my-1">
                            <Image src={foundMenu} alt="menu image" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Subtotal</label>
                        </td>
                        <td className="text-lg">
                          <span className="mx-2 my-1 font-medium">
                            ${subTotal}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-base font-normal">
                          <label>10% VAT</label>
                        </td>
                        <td>
                          <span className="mx-2 my-1 font-medium">
                            +${vatOnPrice}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-base font-normal">
                          <label>5% service</label>
                        </td>
                        <td>
                          <span className="mx-2 my-1 font-medium">
                            +${serviceOnPrice}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-base font-normal">
                          <label>Discount</label>
                        </td>
                        <td>
                          <span className="mx-2 my-1 text-base font-medium">
                            {discountPercent}%
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-xl font-bold">
                          <label>Total</label>
                        </td>
                        <td>
                          <span className="text-lg text-blue-500">
                            ${reservationForm.total}
                          </span>{" "}
                          &nbsp;
                          <span className="text-red-500">
                            (Drinks are not included!)
                          </span>
                        </td>
                      </tr>
                    </table>

                    <button className="border border-black py-1 px-3 font-medium hover:border-red-500 hover:text-red-500">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="my-[1rem] flex justify-center items-center text-blue-600 text-xl">
                We found a &nbsp;
                {isRoom || isTable ? area : "seat"} at &nbsp;
                {diningTime}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="my-[1rem] flex justify-center items-center">
                  {/* --------------------------5:00 PM------------------------- */}
                  {barAt05PM || tableAt05PM || roomAt05PM ? (
                    <>
                      <input
                        id="500"
                        name="diningTime"
                        value="05:00 PM"
                        type="radio"
                        className="hidden"
                        onChange={handleChange}
                        checked={false}
                      />
                      <label
                        htmlFor="500"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        05:00 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "05:00 PM" ? (
                        <>
                          <input
                            id="500"
                            name="diningTime"
                            value="05:00 PM"
                            type="radio"
                            className="hidden"
                            checked
                          />
                          <label
                            htmlFor="500"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            05:00 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="500"
                            name="diningTime"
                            value="05:00 PM"
                            type="radio"
                            className="hidden"
                            checked={false}
                          />
                          <label
                            htmlFor="500"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            05:00 PM
                          </label>
                        </>
                      )}
                    </>
                  )}

                  {/* <!-- -------------------06:30 PM--------------------- --> */}
                  {barAt0630PM || tableAt0630PM || roomAt0630PM ? (
                    <>
                      <input
                        id="630"
                        name="diningTime"
                        value="06:30 PM"
                        type="radio"
                        className="hidden"
                        checked={false}
                      />
                      <label
                        htmlFor="630"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        06:30 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "06:30 PM" ? (
                        <>
                          <input
                            id="630"
                            name="diningTime"
                            value="06:30 PM"
                            type="radio"
                            className="hidden"
                            checked
                          />
                          <label
                            htmlFor="630"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            06:30 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="630"
                            name="diningTime"
                            value="06:30 PM"
                            type="radio"
                            className="hidden"
                            checked={false}
                          />
                          <label
                            htmlFor="630"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            06:30 PM
                          </label>
                        </>
                      )}
                    </>
                  )}

                  {/* <!-- ---------------------08:00 PM------------------------ --> */}
                  {barAt0800PM || tableAt0800PM || roomAt0800PM ? (
                    <>
                      <input
                        id="800"
                        name="diningTime"
                        value="08:00 PM"
                        type="radio"
                        className="hidden"
                        checked={false}
                      />
                      <label
                        htmlFor="800"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        08:00 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "08:00 PM" ? (
                        <>
                          <input
                            id="800"
                            name="diningTime"
                            value="08:00 PM"
                            type="radio"
                            className="hidden"
                            checked
                          />
                          <label
                            htmlFor="800"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            08:00 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="800"
                            name="diningTime"
                            value="08:00 PM"
                            type="radio"
                            className="hidden"
                            checked={false}
                          />
                          <label
                            htmlFor="800"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            08:00 PM
                          </label>
                        </>
                      )}
                    </>
                  )}

                  {/* <!-- -----------------09:30 PM--------------------- --> */}
                  {barAt0930PM || tableAt0930PM || roomAt0930PM ? (
                    <>
                      <input
                        id="930"
                        name="diningTime"
                        value="09:30 PM"
                        type="radio"
                        className="hidden"
                        checked={false}
                      />
                      <label
                        htmlFor="930"
                        className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full bg-black"
                      >
                        09:30 PM
                      </label>
                    </>
                  ) : (
                    <>
                      {diningTime === "09:30 PM" ? (
                        <>
                          <input
                            id="930"
                            name="diningTime"
                            value="09:30 PM"
                            type="radio"
                            className="hidden"
                            checked
                          />
                          <label
                            htmlFor="930"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            09:30 PM
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id="930"
                            name="diningTime"
                            value="09:30 PM"
                            type="radio"
                            className="hidden"
                            checked={false}
                          />
                          <label
                            htmlFor="930"
                            className="border border-gray-400 px-4 py-1 bg-opacity-50 text-center font-medium w-full"
                          >
                            09:30 PM
                          </label>
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* -----------------------------RESERVATION FORM----------------------------- */}
                <div>
                  <div className="flex justify-center items-center text-xl font-medium bg-rose-100 py-[1rem]">
                    COMPLETE YOUR RESERVATION
                  </div>
                  <div className="flex justify-around items-end my-[1rem]">
                    <table>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Customer Name</label>
                        </td>
                        <td className="text-lg">
                          <input
                            className="px-2 py-1"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            name="customerName"
                            value={reservationForm.customerName}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Email</label>
                        </td>
                        <td className="text-lg">
                          <input
                            className="px-2 py-1"
                            type="text"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            name="email"
                            value={reservationForm.email}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Tel</label>
                        </td>
                        <td className="text-lg">
                          <input
                            className="px-2 py-1"
                            type="text"
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                            name="tel"
                            value={reservationForm.tel}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Guests</label>
                        </td>
                        <td className="text-lg">
                          <span className="px-2 py-1">{guests}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Dining Date</label>
                        </td>
                        <td className="text-lg">
                          <span className="px-2 py-1">{diningDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Dining Time</label>
                        </td>
                        <td className="text-lg">
                          <span className="px-2 py-1">
                            {reservationForm.diningTime}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Area</label>
                        </td>
                        <td className="text-lg">
                          <span className="px-2 py-1">{area}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Menu</label>
                        </td>
                        <td>
                          <div className="w-[2.5rem] mx-2 my-1">
                            <Image src={foundMenu} alt="menu image" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-lg font-medium">
                          <label>Subtotal</label>
                        </td>
                        <td className="text-lg">
                          <span className="mx-2 my-1 font-medium">
                            ${subTotal}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-base font-normal">
                          <label>10% VAT</label>
                        </td>
                        <td>
                          <span className="mx-2 my-1 font-medium">
                            +${vatOnPrice}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-base font-normal">
                          <label>5% service</label>
                        </td>
                        <td>
                          <span className="mx-2 my-1 font-medium">
                            +${serviceOnPrice}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-base font-normal">
                          <label>Discount</label>
                        </td>
                        <td>
                          <span className="mx-2 my-1 text-base font-medium">
                            {discountPercent}%
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-[3rem] text-xl font-bold">
                          <label>Total</label>
                        </td>
                        <td>
                          <span className="text-lg text-blue-500">
                            ${reservationForm.total}
                          </span>
                          &nbsp;
                          <span className="text-red-500">
                            (Drinks are not included!)
                          </span>
                        </td>
                      </tr>
                    </table>

                    <button className="border border-black py-1 px-3 font-medium hover:border-red-500 hover:text-red-500">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </>
      </Modal>
    </>
  );
};

export default ModalReservation;
