import React from "react";
import { Space, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { Image } from "antd";
import { useState } from "react";
import { Menu } from "../pages/Reservations";
import { Modal } from "antd";
import AdminAddReservation from "./AdminAddReservation";
import ModalUpdateReservation from "./ModalUpdateReservation";

export interface DataType {
  key: string;
  no: number;
  reservationId: string;
  customerName: string;
  email: string;
  tel: string;
  guests: number;
  diningDate: string;
  diningTime: string;
  menu: string[];
  area: string;
  discountPercentage: number;
  total: number;
  paymentStatus: number;
  reserveDate: string;
}

const AdminReservations: React.FC = () => {
  const [reservations, setReservations] = useState<DataType[]>([]);
  const [allMenu, setAllMenu] = useState<Menu[]>([]);

  //Get all menus:
  const getAllMenu = async () => {
    try {
      const response = await axios.get("http://localhost:3001/menu");
      setAllMenu(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllMenu();
  }, []);

  //Get all reservations:
  const getReservations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reservation");
      setReservations(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getReservations();
  }, []);

  //Cancel a reservation:
  const handleCancelReservation = (reservationId: string) => async () => {
    try {
      Modal.confirm({
        title: "RESERVATION CANCELLATION CONFIRMATION",
        content: "Do you want to cancel this reservation?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          await axios.delete(
            `http://localhost:3001/reservation/${reservationId}`
          );
          getReservations();
          notification.success({
            message: "Cancel reservation successfully!",
          });
        },
      });
    } catch (error) {
      console.log("Error while canceling reservation in admin-->", error);
    }
  };

  //Open moadal update reservation:
  const [openModalUpdateReservation, setOpenModalUpdateReservation] =
    useState(false);

  //Update a reservation:
  const [updateReservation, setUpdateReservation] = useState<DataType[]>([]);

  const handleUpdateReservation = (reservationId: string) => async () => {
    const foundReservation = reservations?.find(
      (reserve: any) => reserve.reservationId === reservationId
    );
    setUpdateReservation(foundReservation);
    setOpenModalUpdateReservation(true);
  };

  //Close modal update reservation:
  const handleCloseModalUpdateReservation = (): any => {
    setOpenModalUpdateReservation(false);
  };

  //Handle change input search:
  const [valueInputSearch, setValueInputSearch] = useState("");
  const handleChangeSearchFunction = async (e: any) => {
    const valueInputSearch = e.target.value;
    setValueInputSearch(valueInputSearch);
  };

  //Search:
  const [searchReservation, setSearchReservation] = useState<DataType[]>([]);
  const [searchResultError, setSearchResultError] = useState("");
  const handleSearchFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `http://localhost:3001/search/reservation/key?key=${valueInputSearch}`
      );
      if (result.data.length === 0) {
        setSearchResultError("No result found!");
        return;
      } else {
        setSearchReservation([...result.data]);
        setSearchResultError("");
      }
    } catch (error) {
      console.log("Error while searching reservation in admin-->", error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Guests",
      dataIndex: "guests",
      key: "guests",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Menu",
      dataIndex: "menu",
      key: "menu",
      render: (_, { menu }) => (
        <>
          {menu?.map((item) => {
            return (
              <div className="w-[3rem]">
                <Image
                  className=" rounded-lg"
                  src={item.image}
                  alt="menu image"
                />
              </div>
            );
          })}
        </>
      ),
    },
    {
      title: "Dining Date",
      dataIndex: "diningDate",
      key: "diningDate",
      render: (diningDate) => (
        <span className="text-blue-500">{diningDate}</span>
      ),
    },
    {
      title: "Dining time",
      dataIndex: "diningTime",
      key: "diningTime",
      render: (diningTime) => (
        <span className="text-blue-500">{diningTime}</span>
      ),
    },

    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (text) => <span>{text}%</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => <span>${total}</span>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <>
          {paymentStatus === 0 && (
            <img className="w-[3rem]" src="/badge/paid.png" alt="paid" />
          )}
        </>
      ),
    },
    {
      title: "Reserving Date",
      dataIndex: "reserveDate",
      key: "reserveDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</p>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={handleUpdateReservation(record.reservationId)}
            className="border-2 py-[.2rem] px-[.5rem] hover:bg-blue-300 rounded-lg hover:border-white hover:text-white"
          >
            Update
          </button>
          <button
            onClick={handleCancelReservation(record.reservationId)}
            className="border-2 py-[.2rem] px-[.5rem] hover:bg-rose-300 rounded-lg hover:border-white hover:text-white"
          >
            Cancel
          </button>
        </Space>
      ),
    },
  ];
  return (
    <>
      {openModalUpdateReservation ? (
        <ModalUpdateReservation
          handleCloseModalUpdateReservation={handleCloseModalUpdateReservation}
          updateReservation={updateReservation}
          getReservations={getReservations}
          allMenu={allMenu}
        />
      ) : (
        <></>
      )}

      <form
        className="flex justify-left gap-4 items-center mb-[1rem]"
        onSubmit={handleSearchFunction}
      >
        <div className="relative">
          <input
            className="border-2 py-1 px-3 w-[15rem] outline-none rounded-md"
            type="text"
            onChange={handleChangeSearchFunction}
            placeholder="Search something..."
          />
          <i className="fa-sharp fa-solid fa-magnifying-glass fa-beat  absolute right-3 top-[.55rem]"></i>
        </div>
        <span className="text-red-500">{searchResultError}</span>
      </form>

      <AdminAddReservation
        getReservations={getReservations}
        allMenu={allMenu}
      />

      <Table
        columns={columns}
        dataSource={
          searchReservation?.length > 0 ? searchReservation : reservations
        }
        pagination={{ pageSize: 2 }}
      />
    </>
  );
};

export default AdminReservations;
