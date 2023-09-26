import React, { useState } from "react";
import { Table, Image, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

interface DataType {
  key: string;
  no: number;
  fullName: string;
  email: string;
  tel: string;
  guests: number;
  menu: string[];
  diningDate: string;
  diningTime: string;
  area: string;
  total: number;
  reserveDate: string;
  cancelDate: string;
}
const AdminCancellations: React.FC = () => {
  const [cancellations, setCancellations] = React.useState([]);

  //Get all cancellations:
  const getCancellations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cancellations");
      setCancellations(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCancellations();
  }, []);

  //Handle change input search:
  const [valueInputSearch, setValueInputSearch] = useState("");
  const handleChangeSearchFunction = async (e: any) => {
    const valueInputSearch = e.target.value;
    setValueInputSearch(valueInputSearch);
  };

  //Search:
  const [searchCancellation, setSearchCancellation] = useState<DataType[]>([]);
  const [searchResultError, setSearchResultError] = useState("");
  const handleSearchFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `http://localhost:3001/search/cancellation/key?key=${valueInputSearch}`
      );
      if (result.data.length === 0) {
        setSearchResultError("No result found!");
        return;
      } else {
        setSearchCancellation([...result.data]);
        setSearchResultError("");
      }
    } catch (error) {
      console.log("Error while searching reservation in admin-->", error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: cancellations[0] + 1,
      key: cancellations[0] + 1,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Full Name",
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
    },
    {
      title: "Dining time",
      dataIndex: "diningTime",
      key: "diningTime",
    },

    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => <span>${total}</span>,
    },
    {
      title: "Reserving Date",
      dataIndex: "reserveDate",
      key: "reserveDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</p>,
    },
    {
      title: "Cancel Date",
      dataIndex: "cancelDate",
      key: "cancelDate",
      render: (cancelDate) => (
        <span className="text-red-600">
          {moment(cancelDate).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
  ];

  return (
    <>
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
      <Table
        columns={columns}
        dataSource={
          searchCancellation.length > 0 ? searchCancellation : cancellations
        }
        pagination={{ pageSize: 3 }}
      />
    </>
  );
};

export default AdminCancellations;
