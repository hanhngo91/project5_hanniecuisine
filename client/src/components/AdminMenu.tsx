import React, { useState } from "react";
import { Space, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Image, Modal } from "antd";
import AdminAddMenu from "./AdminAddMenu";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

interface DataType {
  key: string;
  no: number;
  menuId: string;
  menuName: string;
  image: string;
  price: number;
  menuStatus: string;
  uploadDate: string;
}
const AdminMenu: React.FC = () => {
  const [allMenu, setAllMenu] = React.useState([]);

  //Get all menus:
  const getAllMenu = async () => {
    try {
      const reponse = await axios.get("http://localhost:3001/menu");
      setAllMenu(reponse.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllMenu();
  }, []);

  //Change menu status:
  const handleChangeStatus = (menuId: string) => async () => {
    try {
      await axios.put(`http://localhost:3001/menu/status/${menuId}`);
      getAllMenu();
      notification.success({
        message: "Change menu status successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Delete menu:
  const handleDeleteMenu = (menuId: string) => async () => {
    try {
      Modal.confirm({
        title: "DELETE MENU CONFIRMATION",
        content: "Are you sure to delete this menu?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          await axios.delete(`http://localhost:3001/menu/${menuId}`);
          getAllMenu();
          notification.success({
            message: "Delete menu successfully!",
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Update menu:
  const [updateMenu, setUpdateMenu] = React.useState([] as any);
  const handleUpdateMenu = (menuId: string) => async () => {
    setUpdateMenu(allMenu.find((menu: any) => menu.menuId === menuId));
  };
  //Handle change input search:
  const [valueInputSearch, setValueInputSearch] = useState("");
  const handleChangeSearchFunction = async (e: any) => {
    const valueInputSearch = e.target.value;
    setValueInputSearch(valueInputSearch);
  };

  //Search:
  const [searchMenus, setSearchMenus] = useState<DataType[]>([]);
  const [searchResultError, setSearchResultError] = useState("");
  const handleSearchFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `http://localhost:3001/search/menu/key?key=${valueInputSearch}`
      );
      if (result.data.length === 0) {
        setSearchResultError("No result found!");
        return;
      } else {
        setSearchMenus([...result.data]);
        setSearchResultError("");
      }
    } catch (error) {
      console.log("Error while searching menu in admin-->", error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Menu Name",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "Menu Image",
      dataIndex: "image",
      key: "image",
      render: (url) => (
        <div className="w-[3rem]">
          <Image className="w-[3rem] rounded-lg" src={url} alt="Menu Image" />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</p>,
    },
    {
      title: "Status",
      dataIndex: "menuStatus",
      key: "menuStatus",
      render: (menuStatus) =>
        menuStatus === "available" ? (
          <p className="text-green-500 text-lg">{menuStatus}</p>
        ) : (
          <p className="text-red-500 text-lg">{menuStatus}</p>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={handleChangeStatus(record.menuId)}
            className="border-2 py-[.2rem] px-[.5rem] hover:bg-green-400 rounded-lg hover:border-white hover:text-white"
          >
            Change menu status
          </button>
          <button
            onClick={handleUpdateMenu(record.menuId)}
            className="border-2 py-[.2rem] px-[.5rem] hover:bg-blue-300 rounded-lg hover:border-white hover:text-white"
          >
            Update
          </button>
          <button
            onClick={handleDeleteMenu(record.menuId)}
            className="border-2 py-[.2rem] px-[.5rem] hover:bg-rose-300 rounded-lg hover:border-white hover:text-white"
          >
            Delete
          </button>
        </Space>
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
      <AdminAddMenu getAllMenu={getAllMenu} updateMenu={updateMenu} />
      <Table
        columns={columns}
        dataSource={searchMenus.length > 0 ? searchMenus : allMenu}
        pagination={{ pageSize: 2 }}
      />
    </>
  );
};
export default AdminMenu;
