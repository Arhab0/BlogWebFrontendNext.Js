export type MenuItem = {
  label: string;
  path: string;
};

type Menus = {
  [key: string]: MenuItem[];
};

export const menus: Menus = {
  Profile: [
    {label:"Home", path:"/Home"},
    { label: "Profile", path: "/Profile" },
    { label: "All Post", path: "/Profile/AllPosts"},
    { label: "Watch Later", path: "/Profile/WatchLater"},
    { label: "History", path: "/Profile/History"},
  ],
  DashBoard:[
    {label:"DashBoard", path:"/DashBoard"},
    {label:"Posts", path:"/DashBoard/Posts"},
    {label:"Users", path:"/DashBoard/Users"},
    {label:"Post Requests", path:"/DashBoard/PostRequest"},
  ]
};
