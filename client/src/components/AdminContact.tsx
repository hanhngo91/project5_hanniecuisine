import React from "react";
import { Table, notification, Modal, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";

interface DataType {
  messageId: string;
  key: string;
  no: number;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  subject: string;
  message: string;
  createdDate: string;
  expanded: boolean;
}

const AdminContact: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<DataType & { expanded: boolean }>
  >([]);

  //See more:
  const handleSeeMore = (messageId: string) => {
    setMessages((prevMessage) =>
      prevMessage.map((messageData) =>
        messageData.messageId === messageId
          ? { ...messageData, expanded: !messageData.expanded }
          : messageData
      )
    );
  };

  //Get all messages:
  const getMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/message");
      const messageWithExpanded = response?.data.map(
        (messageData: DataType) => ({
          ...messageData,
          expanded: false,
        })
      );
      setMessages(messageWithExpanded);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  //Delete message:
  const handleDeleteMessage = (messageId: string) => async () => {
    console.log("messageId", messageId);
    try {
      Modal.confirm({
        title: "DELETE MESSAGE CONFIRMATION",
        content: "Are you sure to delete this message?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          await axios.delete(`http://localhost:3001/message/${messageId}`);
          notification.success({
            message: "Delete message successfully!",
          });
          getMessages();
        },
      });
    } catch (error) {
      console.log("Error when delete message-->", error);
    }
  };

  //Handle change input search:
  const [valueInputSearch, setValueInputSearch] = useState("");
  const handleChangeSearchFunction = async (e: any) => {
    const valueInputSearch = e.target.value;
    setValueInputSearch(valueInputSearch);
  };

  //Search:
  const [searchMessages, setSearchMessages] = useState<DataType[]>([]);
  const [searchResultError, setSearchResultError] = useState("");
  const handleSearchFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `http://localhost:3001/search/message/key?key=${valueInputSearch}`
      );
      if (result.data.length === 0) {
        setSearchResultError("No result found!");
        return;
      } else {
        setSearchMessages([...result.data]);
        setSearchResultError("");
      }
    } catch (error) {
      console.log("Error while searching reservation in admin-->", error);
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
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
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
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text, record) => (
        <span>
          {record.expanded ? text : `${text.slice(0, 40)}...`}
          <span
            onClick={() => handleSeeMore(record.messageId)}
            className="cursor-pointer font-medium text-blue-600"
          >
            {record.expanded ? "...see less" : "see more"}
          </span>
        </span>
      ),
    },
    {
      title: "Receiving Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => (
        <p className="text-rose-600">
          {moment(text).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      ),
    },
    ,
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={handleDeleteMessage(record.messageId)}
          className="border-2 py-[.2rem] px-[.5rem] hover:bg-rose-300 rounded-lg hover:border-white hover:text-white"
        >
          Delete
        </button>
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
        dataSource={searchMessages.length > 0 ? searchMessages : messages}
        pagination={{ pageSize: 3 }}
      />
    </>
  );
};

export default AdminContact;
