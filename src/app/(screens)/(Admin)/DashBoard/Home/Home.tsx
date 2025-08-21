"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { FaUser, FaUserCheck, FaUserSlash } from "react-icons/fa";
import {
  TbArticle,
  TbArticleFilled,
  TbArticleOff,
  TbRefresh,
} from "react-icons/tb";
import { MdOutlinePending } from "react-icons/md";
import PostStatusChart from "@/app/utils/components/Chart/PostStatusChart";
import UserStatusChart from "@/app/utils/components/Chart/UserStatusChart";
import useHelper from "../../../../../../Helper/helper";

const initialCards = [
  {
    id: "totalUsers",
    title: "Total Users",
    valueKey: "TotalUsers",
    icon: <FaUser />,
    color: "blue",
  },
  {
    id: "activeUsers",
    title: "Active Users",
    valueKey: "ActiveUsers",
    icon: <FaUserCheck />,
    color: "green",
  },
  {
    id: "deactivatedUsers",
    title: "Deactivated Users",
    valueKey: "DeActivatedUsers",
    icon: <FaUserSlash />,
    color: "red",
  },
  {
    id: "totalPosts",
    title: "Total Posts",
    valueKey: "TotalPosts",
    icon: <TbArticle />,
    color: "blue",
  },
  {
    id: "activePosts",
    title: "Active Posts",
    valueKey: "ActivePosts",
    icon: <TbArticleFilled />,
    color: "green",
  },
  {
    id: "rejectedPosts",
    title: "Rejected Posts",
    valueKey: "RejectedPosts",
    icon: <TbArticleOff />,
    color: "red",
  },
  {
    id: "pendingPosts",
    title: "Pending Posts",
    valueKey: "PendingPosts",
    icon: <MdOutlinePending />,
    color: "yellow",
  },
  {
    id: "resubmittedPosts",
    title: "Resubmitted Posts",
    valueKey: "ReSubmittedPosts",
    icon: <TbRefresh />,
    color: "orange",
  },
];

const Home = () => {
  const helper = useHelper();
  const [info, setInfo] = useState({
    TotalUsers: 0,
    ActiveUsers: 0,
    DeActivatedUsers: 0,
    TotalPosts: 0,
    ActivePosts: 0,
    RejectedPosts: 0,
    PendingPosts: 0,
    ReSubmittedPosts: 0,
  });

  const [cards, setCards] = useState(initialCards);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedCardId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedCardId === null || draggedCardId === targetId) return;

    const draggedIndex = cards.findIndex((card) => card.id === draggedCardId);
    const targetIndex = cards.findIndex((card) => card.id === targetId);

    const updated = [...cards];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, removed);

    setCards(updated);
    setDraggedCardId(null);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  useEffect(() => {
    FetchData();
  }, []);

  function FetchData() {
    helper.xhr
      .Get("/Admin/Information")
      .then((res) => {
        setInfo(res);
      })
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              draggable
              onDragStart={(e) => handleDragStart(e, card.id)}
              onDrop={(e) => handleDrop(e, card.id)}
              onDragOver={handleDragOver}
              className="cursor-move"
            >
              <DashboardCard
                title={card.title}
                value={info[card.valueKey as keyof typeof info]}
                icon={card.icon}
                color={
                  card.color as "blue" | "green" | "red" | "yellow" | "orange"
                }
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Posts Status Overview
          </h2>
          <PostStatusChart data={info} />
        </div>
        <div className="lg:col-span-4 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Users Status Overview
          </h2>
          <UserStatusChart data={info} />
        </div>
      </div>
    </div>
  );
};

export default Home;
