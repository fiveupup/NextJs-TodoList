"use client";
import Image from "next/image";

import Todo from "@/components/Todo";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);
  // 拉取数据
  const fetchTodos = async () => {
    const response = await axios.get("/api");
    setTodoData(response.data.todos);
  };

  // 删除数据
  const deleteTodo = async (id:string) => {
       const response = await axios.delete('/api', {
        params: {
          mongoId:id
        }
       })
       toast.success(response.data.msg);
       fetchTodos();
  }

  // 更新数据
  const completeTodo = async (id:string) => {
    const response = await axios.put('/api', {}, {
      params: {
        mongoId:id
      }
    });
    toast.success(response.data.msg);
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    try {
      // api code
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      // 清空输入框
      setFormData({
        title: "",
        description: "",
      });

      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <main>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto "
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChangeHandler}
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={onChangeHandler}
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>
        <button type="submit" className="bg-orange-600  px-11 py-3 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto my-24 w-[60%] mx-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item: any, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo = {deleteTodo}
                  completeTodo = {completeTodo}
                ></Todo>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
