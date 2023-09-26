import { FileAddOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Image, notification } from "antd";
import axios from "axios";

const AdminAddMenu = ({
  getAllMenu,
  updateMenu,
}: {
  getAllMenu: () => void;
  updateMenu: any;
}) => {
  const [addMenuForm, setAddMenuForm] = useState({
    image: "",
    price: 0,
    menuName: "",
  });

  const [menuUpdate, setMenuUpdate] = useState({
    image: "",
    price: 0,
    menuName: "",
  });

  useEffect(() => {
    setMenuUpdate(updateMenu);
  }, [updateMenu]);

  const uploadImage = async (files: any) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "hanniebrand");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlyaho7zj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setAddMenuForm({
      ...addMenuForm,
      image: file.secure_url,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddMenuForm({
      ...addMenuForm,
      [name]: value,
    });
    setMenuUpdate({
      ...menuUpdate,
      [name]: value,
    });
  };

  //Check empty input:
  const checkEmptyInput = (input: any) => {
    for (let key in input) {
      if (input[key] === "") {
        return true;
      }
    }
    return false;
  };

  //Handle submit form add menu:
  const handleAddMenu = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (checkEmptyInput(addMenuForm) && !menuUpdate) {
        notification.error({
          message: "Please fill in all the fields!",
        });
        return;
      } else {
        if (addMenuForm.image && addMenuForm.price && addMenuForm.menuName) {
          await axios.post("http://localhost:3001/menu", addMenuForm);
          getAllMenu();
          notification.success({
            message: "Add menu successfully!",
          });
          setAddMenuForm({
            image: "",
            price: 0,
            menuName: "",
          });
          setMenuUpdate({
            image: "",
            price: 0,
            menuName: "",
          });
          return;
        }
      }

      if (checkEmptyInput(menuUpdate) && !addMenuForm) {
        notification.error({
          message: "Please fill in all the fields!",
        });
        return;
      } else {
        if (
          menuUpdate.image &&
          menuUpdate.price &&
          menuUpdate.menuName &&
          menuUpdate.menuId
        ) {
          await axios.put(
            `http://localhost:3001/menu/${menuUpdate.menuId}`,
            menuUpdate
          );
          getAllMenu();
          notification.success({
            message: "Update menu successfully!",
          });
          setAddMenuForm({
            image: "",
            price: 0,
            menuName: "",
          });
          setMenuUpdate({
            image: "",
            price: 0,
            menuName: "",
          });
          return;
        }
      }
    } catch (error) {
      console.log("Error when upload menu-->", error);
    }
  };

  return (
    <div className="mt-[1rem] pb-[2rem] border-b border-[#bbb]">
      <form onSubmit={handleAddMenu}>
        <div className="flex justify-left items-center gap-[3rem]">
          <div>
            <label
              className="border-2 border-[#bbb] py-[.6rem] px-[1.1rem] rounded-[.5rem]"
              htmlFor="menuImage"
            >
              Choose a menu &nbsp; <FileAddOutlined />
            </label>
            <input
              className="hidden"
              id="menuImage"
              type="file"
              name="image"
              onChange={(e) => {
                uploadImage(e.target.files);
              }}
            />
          </div>
          {/* -----------image show up--------------- */}
          {(addMenuForm.image || menuUpdate.image) && (
            <div className="w-[3rem] ">
              <Image
                className="rounded-[.5rem]"
                src={addMenuForm.image || menuUpdate.image}
                alt="menu image"
              />
            </div>
          )}
          {/* --------------------------------------- */}
          <div className="flex justify-around gap-[3rem]">
            <input
              className="border-2 border-[#bbb] py-[.5rem] px-[1rem] rounded-[.5rem] outline-none"
              type="number"
              placeholder="Enter price"
              name="price"
              min={0}
              onChange={handleChange}
              value={menuUpdate.price}
            />
            <input
              className="border-2 border-[#bbb] py-[.5rem] px-[1rem] rounded-[.5rem] outline-none"
              type="text"
              placeholder="Enter menu name"
              name="menuName"
              onChange={handleChange}
              value={menuUpdate.menuName}
            />
          </div>
          {menuUpdate.image ? (
            <button className="border-2 border-[#bbb] py-[.5rem] px-[1rem] rounded-[.5rem] hover:bg-blue-300 hover:text-white hover:border-white">
              UPDATE
            </button>
          ) : (
            <button className="border-2 border-[#bbb] py-[.5rem] px-[1rem] rounded-[.5rem] hover:bg-blue-300 hover:text-white hover:border-white">
              ADD
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminAddMenu;
