export type MenuItem = {
  label: string;
  path: string;
};

type Menus = {
  [key: string]: MenuItem[];
};

export const menus: Menus = {
  Profile: [
    { label: "Profile", path: "/Profile" },
    { label: "All Post", path: "/Profile/AllPosts"},
    { label: "Watch Later", path: "/Profile/WatchLater"},
    { label: "History", path: "/Profile/History"},
  ]
};
