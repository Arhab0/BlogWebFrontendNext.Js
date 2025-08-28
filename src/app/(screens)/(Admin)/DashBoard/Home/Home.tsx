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
import moment from "moment";

interface Logs{
  Title: string,
  Description:string,
  Name:string,
  AddedAt:string,
  Type:string
}

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
  const[logs,setLogs] = useState<Logs[]>([])
  const [cards, setCards] = useState(initialCards);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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

   const renderIcon = (type: string) => {
    switch (type) {
      case "Activate":
        return <FaUserCheck className="text-green-600" />;
      case "Signup":
        return <FaUser className="text-blue-600" />;
      case "Deactivate":
        return <FaUserSlash className="text-red-600" />;
      case "Reject":
        return <TbArticleOff className="text-red-500" />;
      case "Approved":
        return <TbArticle className="text-green-500" />;
      case "Request":
        return <MdOutlinePending className="text-yellow-500" />;
      case "ReSubmitted":
        return <TbRefresh className="text-orange-500" />;
      default:
        return <TbArticle className="text-slate-400" />; // fallback
    }
  };

  function FetchData() {
    setIsLoading(true);
     Promise.all([
      helper.xhr.Get(
        "/Admin/Information"
      ),
      helper.xhr.Get(
        "/Admin/GetLogs"
      ),
    ])
    .then(([InfoRes,LogsRes])=>{
        setInfo(InfoRes)
        setLogs(LogsRes)
    })
    .catch(()=>{})
    .finally(()=>{setIsLoading(false)})
  }

  const filteredCards = cards.filter(card => {
    if (activeTab === "all") return true;
    if (activeTab === "users") return card.id.includes("Users");
    if (activeTab === "posts") return card.id.includes("Posts");
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Dashboard Overview</h1>
            <p className="text-slate-500 mt-2 text-sm">Monitor your platform activity and metrics</p>
          </div>
          <button 
            onClick={FetchData}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 text-slate-600 hover:text-slate-800 mt-4 md:mt-0"
          >
            <TbRefresh className={`text-lg ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl p-1.5 justify-around shadow-sm w-1/2 mb-8">
          {["all", "users", "posts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg w-full text-sm font-medium transition-all duration-300 ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-slate-600 hover:text-slate-800'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
          {filteredCards.map((card) => {
            return (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card.id)}
                onDrop={(e) => handleDrop(e, card.id)}
                onDragOver={handleDragOver}
                className="cursor-move transition-all duration-300 hover:scale-[1.02]"
              >
                <DashboardCard
                  title={card.title}
                  value={info[card.valueKey as keyof typeof info]}
                  icon={card.icon}
                  color={card.color as "blue" | "green" | "red" | "yellow" | "orange"}
                  isLoading={isLoading}
                />
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-10">
          <div className={`${activeTab == "all" ? "lg:col-span-6" : activeTab == "posts" ? "lg:col-span-10":"hidden"} bg-white rounded-2xl shadow-sm p-4 border border-slate-200`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Posts Status Overview
              </h2>
            </div>
            <PostStatusChart data={info} />
          </div>
          <div className={`${activeTab == "all" ? "lg:col-span-4" : activeTab == "users" ? "lg:col-span-10":"hidden"} bg-white rounded-2xl shadow-sm p-6 border border-slate-200`}>
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Users Status Overview
            </h2>
            <UserStatusChart data={info} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4 h-80 overflow-y-auto">
           {logs.map((activity:Logs, index:number) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-1">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  {renderIcon(activity.Type)}
                </div>
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium">{activity.Title}</p>
                  <p className="text-slate-500 text-xs">{activity.Description} 🔹 {moment(activity.AddedAt).fromNow()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;