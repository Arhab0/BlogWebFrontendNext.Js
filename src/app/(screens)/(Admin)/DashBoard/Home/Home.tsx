"use client";
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import { FaUser, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { TbArticle, TbArticleFilled, TbArticleOff } from "react-icons/tb";
import { MdOutlinePending } from "react-icons/md";
import PostStatusChart from "@/app/utils/components/Chart/PostStatusChart";
import UserStatusChart from "@/app/utils/components/Chart/UserStatusChart";

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
];

const Home = () => {
  const [info, setInfo] = useState({
    TotalUsers: 105,
    ActiveUsers: 78,
    DeActivatedUsers: 27,
    TotalPosts: 240,
    ActivePosts: 180,
    RejectedPosts: 40,
    PendingPosts: 20,
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
        {cards.map((card) => (
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
              color={card.color as "blue" | "green" | "red" | "yellow"}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Post Status Overview
          </h2>
          <PostStatusChart data={info} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            User Status Overview
          </h2>
          <UserStatusChart data={info} />
        </div>
      </div>
    </div>
  );
};

export default Home;