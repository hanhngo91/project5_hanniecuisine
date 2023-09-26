import { Select, InputNumber, Input, notification } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { Customers } from "./ModalReservation";

function AdminAddReservation({
  getReservations,
  allMenu,
}: {
  getReservations: () => void;
  allMenu: any[];
}) {
  const [formAddreservation, setFormAddreservation] = useState({
    customerName: "",
    email: "",
    tel: "",
    guests: 0,
    diningDate: "",
    diningTime: "",
    area: "",
    discountPercentage: 0,
    total: 0,
    menu: "",
  });

  //Find customer:
  const [foundCustomer, setFoundCustomer] = useState<Customers[] | undefined>(
    []
  );
  const findCustomer = () => {
    const foundCustomer = allCustomers?.find(
      (item) =>
        item.customerName === formAddreservation?.customerName &&
        item.email === formAddreservation?.email &&
        item.tel === formAddreservation?.tel
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
  }, [formAddreservation]);

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

  //Handle change:
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAddreservation({ ...formAddreservation, [name]: value });
  };
  console.log("formAddreservation-->", formAddreservation);

  const chosenMenu = allMenu.find(
    (menu) => menu.menuId === formAddreservation.menu
  );

  //Count total price:
  const subTotal = formAddreservation.guests * chosenMenu?.price;

  //VAT:
  const vatOnPrice = subTotal * 0.1;

  //Service On Price:
  const serviceOnPrice = subTotal * 0.05;

  //Total price:
  const findTotalPrice = () => {
    const tempPrice = subTotal + vatOnPrice + serviceOnPrice;
    const discount = tempPrice * (discountPercent / 100);
    const totalPrice = tempPrice - discount;
    setFormAddreservation({
      ...formAddreservation,
      total: Number(totalPrice.toFixed(2)),
      discountPercentage: discountPercent,
    });
  };

  useEffect(() => {
    findTotalPrice();
  }, [subTotal, vatOnPrice, serviceOnPrice, discountPercent]);

  //Get date for date input:
  const getDate = new Date();
  const convertedDate = getDate.toISOString().slice(0, 10);

  //Get all customers:
  const [allCustomers, setAllCustomers] = useState([]);
  const getAllCustomers = async () => {
    const response = await axios.get("http://localhost:3001/customer");
    setAllCustomers(response.data);
  };
  useEffect(() => {
    getAllCustomers();
  }, []);

  //Check empty inputs:
  const checkEmptyInputs = () => {
    if (
      formAddreservation.customerName === "" ||
      formAddreservation.email === "" ||
      formAddreservation.tel === "" ||
      formAddreservation.guests === 0 ||
      formAddreservation.diningDate === "" ||
      formAddreservation.diningTime === "" ||
      formAddreservation.area === "" ||
      formAddreservation.menu === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  //Add reservation:
  const handleAddReservation = async (e: any) => {
    e.preventDefault();
    try {
      if (checkEmptyInputs()) {
        notification.error({
          message: "Please fill in all fields",
        });
      } else {
        const response = await axios.post(
          "http://localhost:3001/reservation",
          formAddreservation
        );

        if (
          response.data.message === "No rooms available!" ||
          response.data.message === "No table available!" ||
          response.data.message === "No seats available!"
        ) {
          return notification.error({
            message: "Fully booked!",
          });
        } else {
          notification.success({
            message: "Add reservation successfully!",
          });
          getReservations();
          setFormAddreservation({
            customerName: "",
            email: "",
            tel: "",
            guests: 0,
            diningDate: "",
            diningTime: "",
            area: "",
            discountPercentage: 0,
            total: 0,
            menu: "",
          });
        }
      }
    } catch (err) {
      console.log("Error when add reservation from Admin-->", err);
    }
  };
  return (
    <div className="pb-[1rem] border-b border-[#bbb]">
      <form onSubmit={handleAddReservation}>
        <div className="flex justify-between mb-3">
          <Input
            placeholder="Customer name"
            name="customerName"
            value={formAddreservation.customerName}
            onChange={handleChange}
          />
          <Input
            placeholder="Customer email"
            name="email"
            value={formAddreservation.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Customer tel"
            name="tel"
            value={formAddreservation.tel}
            onChange={handleChange}
          />

          <InputNumber
            min={1}
            max={10}
            defaultValue={0}
            name="guests"
            value={formAddreservation.guests}
            onChange={(value) => {
              setFormAddreservation({
                ...formAddreservation,
                guests: value,
              });
            }}
          />
          <Select
            labelInValue
            defaultValue={{ value: "", label: "Area" }}
            style={{ width: 120 }}
            onChange={(selectedOption) => {
              setFormAddreservation({
                ...formAddreservation,
                area: selectedOption.value,
              });
            }}
            options={[
              { value: "bar", label: "Bar" },
              { value: "table", label: "Table" },
              { value: "room", label: "Room" },
            ]}
          />

          <Select
            labelInValue
            defaultValue={{ value: "", label: "Menu" }}
            style={{ width: 120 }}
            onChange={(selectedOption) => {
              setFormAddreservation({
                ...formAddreservation,
                menu: selectedOption.value,
              });
            }}
            options={allMenu.map((menu) => ({
              value: menu.menuId,
              label: menu.menuName + " - $" + menu.price + "/pax",
              key: menu.menuId,
            }))}
          />

          <Space direction="vertical" size={10}>
            <DatePicker
              onChange={(date, dateString) => {
                setFormAddreservation({
                  ...formAddreservation,
                  diningDate: dateString,
                });
              }}
              name="diningDate"
              disabledDate={(current) =>
                current && current < moment(convertedDate)
              }
              placeholder="Choose date"
            />
          </Space>
          <Select
            labelInValue
            defaultValue={{ value: "", label: "Choose time" }}
            style={{ width: 120 }}
            onChange={(selectedOption) => {
              setFormAddreservation({
                ...formAddreservation,
                diningTime: selectedOption.value,
              });
            }}
            options={[
              { value: "05:00 PM", label: "05:00 PM" },
              { value: "06:30 PM", label: "06:30 PM" },
              { value: "08:00 PM", label: "08:00 PM" },
              { value: "09:30 PM", label: "09:30 PM" },
            ]}
          />
        </div>
        <div className="flex justify-start items-center gap-10">
          {formAddreservation.menu && formAddreservation.guests && (
            <div className="flex justify-around gap-10">
              <div className="font-medium text-base">Subtotal: ${subTotal}</div>
              <div className="font-medium text-base">
                VAT 10%: +${vatOnPrice}
              </div>
              <div className="font-medium text-base">
                Service 5%: +${serviceOnPrice}
              </div>
              <div className="font-medium text-base">
                Discount: {discountPercent}%
              </div>
              <div className="font-semibold text-base">
                Total: ${formAddreservation.total}
              </div>
            </div>
          )}
          <button className="border-2 border-[#bbb] py-1 px-2 rounded-[.5rem] bg-blue-100 hover:bg-blue-300 hover:text-white hover:border-white">
            MAKE RESERVATION
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAddReservation;
