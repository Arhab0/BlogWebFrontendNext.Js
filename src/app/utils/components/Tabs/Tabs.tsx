import React from "react";

interface Props {
  TabsList: Row[];
  setter: (name: string) => void;
  activeTab: string;
}

type Row = {
  id: string;
  name: string;
  disabled?: boolean;
};

const Tabs = ({ TabsList = [], setter, activeTab }: Props) => {
  return (
    <div className="mb-4 border-b border-gray-200 w-full">
      <ul
        className="flex text-nowrap -mb-px text-sm font-medium text-center mt-8 overflow-auto"
        id="default-tab"
        role="tablist"
      >
        {TabsList.map((tab: Row, index: number) => (
          <li className="me-2" role="presentation" key={index}>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-[#00000095] hover:border-[#00000095] ${
                activeTab == tab.id && "border-black"
              }`}
              id="profile-tab"
              data-tabs-target="#overAll"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              disabled={tab.disabled}
              onClick={() => {
                setter(tab.id);
              }}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
