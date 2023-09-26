import React, { useState } from "react";
import { Table, Tooltip, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect } from "react";

interface DataType {
  key: string;
  no: number;
  customerName: string;
  email: string;
  tel: string;
  points: number;
}

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = React.useState([]);

  //Get all customers:
  const getAllCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/customer");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  //Handle change input search:
  const [valueInputSearch, setValueInputSearch] = useState("");
  const handleChangeSearchFunction = async (e: any) => {
    const valueInputSearch = e.target.value;
    setValueInputSearch(valueInputSearch);
  };

  //Search:
  const [searchCustomers, setSearchCustomers] = useState<DataType[]>([]);
  const [searchResultError, setSearchResultError] = useState("");
  const handleSearchFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `http://localhost:3001/search/customer/key?key=${valueInputSearch}`
      );
      if (result.data.length === 0) {
        setSearchResultError("No result found!");
        return;
      } else {
        setSearchCustomers([...result.data]);
        setSearchResultError("");
      }
    } catch (error) {
      console.log("Error while searching customer in admin-->", error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: customers[0] + 1,
      key: customers[0] + 1,
      render: (text, record, index) => index + 1,
    },
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
      title: "Badge",
      dataIndex: "points",
      key: "points",
      render: (points) => (
        <>
          {Number(points) < 5 && (
            <Tooltip placement="top" title="0% discount">
              <img
                className="w-[2rem]"
                src="/badge/new.png"
                alt="platinum badge"
              />
            </Tooltip>
          )}
          {Number(points) >= 5 && Number(points) < 10 ? (
            <Tooltip placement="top" title="3% discount">
              <img
                className="w-[2rem]"
                src="/badge/regular.png"
                alt="new badge"
              />
            </Tooltip>
          ) : null}
          {Number(points) >= 10 && Number(points) < 20 ? (
            <Tooltip placement="top" title="5% discount">
              <img
                className="w-[2rem]"
                src="/badge/bronze.png"
                alt="bronze badge"
              />
            </Tooltip>
          ) : null}
          {Number(points) >= 20 && Number(points) < 30 ? (
            <Tooltip placement="top" title="7% discount">
              <img
                className="w-[2rem]"
                src="/badge/silver.png"
                alt="silver badge"
              />
            </Tooltip>
          ) : null}
          {Number(points) >= 30 && (
            <Tooltip placement="top" title="10% discount">
              <img
                className="w-[2rem]"
                src="/badge/platinum.png"
                alt="platinum badge"
              />
            </Tooltip>
          )}
        </>
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
        dataSource={searchCustomers.length > 0 ? searchCustomers : customers}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
export default AdminCustomers;
