import { useEffect, useState } from "react";
import { Modal, notification } from "antd";
import { Reservations } from "./ModalReservation";
import { Menu } from "../pages/Reservations";
import axios from "axios";

const ModalUpdateReservation = ({
  handleCloseModalUpdateReservation,
  updateReservation,
  getReservations,
  allMenu,
}: {
  handleCloseModalUpdateReservation: () => void;
  updateReservation: Reservations;
  getReservations: () => void;
  allMenu: Menu[];
}) => {
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [reservationUpdate, setReservationUpdate] = useState<Reservations>({
    customerName: "",
    email: "",
    tel: "",
    guests: 0,
    diningDate: "",
    diningTime: "",
    menu: [],
    area: "",
    total: 0,
  });

  useEffect(() => {
    setReservationUpdate(updateReservation);
  }, [updateReservation]);

  //Get date:
  const getDate = new Date();
  const convertedDate = getDate.toISOString().slice(0, 10);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = (): void => {
    handleCloseModalUpdateReservation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservationUpdate({ ...reservationUpdate, [name]: value });
  };

  const reservationUpdateMenu = updateReservation.menu[0];

  //   Calculate new total:
  const getNewTotal = () => {
    const newSubTotal =
      Number(reservationUpdate?.menu[0]?.price) *
      Number(reservationUpdate?.guests);

    const newVat = newSubTotal * 0.1;
    const newServiceCharge = newSubTotal * 0.05;

    if (
      updateReservation?.discountPercentage !== undefined &&
      updateReservation?.discountPercentage !== null
    ) {
      const newDiscount =
        (newSubTotal * updateReservation?.discountPercentage) / 100;

      const newTotal =
        Number(newSubTotal) +
        Number(newVat) +
        Number(newServiceCharge) -
        Number(newDiscount);

      setReservationUpdate((prevState) => ({
        ...prevState,
        total: newTotal,
      }));
    }
  };
  useEffect(() => {
    getNewTotal();
  }, [reservationUpdate?.guests, reservationUpdate?.menu[0]?.price]);

  //Handle submit update reservation:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/reservation/${updateReservation.reservationId}`,
        reservationUpdate
      );
      if (
        res.data.message === "No table available!" ||
        res.data.message === "No seats available!" ||
        res.data.message === "No rooms available!"
      ) {
        return notification.error({
          message: "Fully booked!",
        });
      }
      notification.success({
        message: "Update reservation successfully",
      });
      setOpen(false);
      getReservations();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={500}
        footer={null}
        style={{ top: 80, maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="flex justify-center items-center text-xl font-semibold py-[.5rem] bg-rose-200 mt-[.3rem]">
          UPDATE RESERVATION
        </div>
        <div className="flex justify-center items-center mt-[1rem] mb-[.3rem]">
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td>
                  <label className="mr-[5rem] text-lg">Customer Name</label>
                </td>
                <td>
                  <span className="text-lg ">
                    {reservationUpdate.customerName}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg">Email</label>
                </td>
                <td>
                  <span className="text-lg ">{reservationUpdate.email}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg">Tel</label>
                </td>
                <td>
                  <span className="text-lg ">{reservationUpdate.tel}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg">Guests</label>
                </td>
                <td>
                  <input
                    className="text-lg outline-none"
                    type="number"
                    name="guests"
                    min={1}
                    max={10}
                    onChange={(e) => {
                      const { value } = e.target;
                      setReservationUpdate({
                        ...reservationUpdate,
                        guests: Number(value),
                      });
                    }}
                    value={reservationUpdate.guests}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg">Area</label>
                </td>
                <td>
                  <select
                    className="text-lg outline-none"
                    name="area"
                    onChange={handleChange}
                  >
                    <option value={reservationUpdate.area}>
                      {reservationUpdate.area}
                    </option>
                    <option value="bar">Bar</option>
                    <option value="table">Table</option>
                    <option value="room">Room</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg">Menu</label>
                </td>
                <td>
                  <select
                    className="text-lg outline-none"
                    onChange={(e) => {
                      const selectedMenuId = e.target.value;
                      const selectedMenu = allMenu.find(
                        (item) => item.menuId === selectedMenuId
                      );

                      if (selectedMenu) {
                        setReservationUpdate({
                          ...reservationUpdate,
                          menu: [selectedMenu],
                        });
                      }
                    }}
                  >
                    {reservationUpdateMenu && (
                      <option value={reservationUpdateMenu.menuId}>
                        {reservationUpdateMenu.menuName} - $
                        {reservationUpdateMenu.price}
                      </option>
                    )}

                    {allMenu.map((item) => {
                      return (
                        <option value={item.menuId}>
                          {item.menuName} - ${item.price}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg">Dining Date</label>
                </td>
                <td>
                  <input
                    className="text-lg outline-none"
                    type="date"
                    name="diningDate"
                    value={reservationUpdate.diningDate}
                    onChange={handleChange}
                    min={convertedDate}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg">Dining Time</label>
                </td>
                <td>
                  <select
                    className="text-lg outline-none"
                    name="diningTime"
                    onChange={handleChange}
                  >
                    <option value={reservationUpdate.diningTime}>
                      {reservationUpdate.diningTime}
                    </option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="09:30 PM">09:30 PM</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-lg font-medium">Total</label>
                </td>
                <td>
                  <span className="text-lg font-medium">
                    $
                    {reservationUpdate.total
                      ? reservationUpdate.total
                      : updateReservation.total}
                  </span>
                </td>
              </tr>
            </table>
            <button className="border border-black py-1 px-3 mt-[1rem] font-medium text-lg hover:bg-rose-300 hover:text-white hover:border-white">
              UPDATE
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdateReservation;
