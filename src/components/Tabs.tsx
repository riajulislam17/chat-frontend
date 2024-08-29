import React, { useState } from "react";

const Tabs: React.FC<{ setActiveTab: (tab: string) => void }> = ({
  setActiveTab,
}) => {
  const [active, setActive] = useState("friend");

  const tabs = ["friend", "receive", "sent"];

  const handleTabClick = (tab: string) => {
    setActive(tab);
    setActiveTab(tab);
  };

  return (
    <div className="flex space-x-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 ${
            active === tab ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)} List
        </button>
      ))}
    </div>
  );
};

export default Tabs;
