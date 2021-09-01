import React from "react";
import * as AiIcons from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

export const SidebarData = [
  {
    id: 1,
    title: "Indexing Analytics",
    path: "/analytics",
    cName: "nav-text",
    active: "active"
  },
  {
    id: 2,
    title: "Search Analytics ",
    path: "/searching",
    cName: "nav-text",
  },
  {
    title: "UX Analytics ",
    path: "/ux",
    cName: "nav-text disabled-link",
  },
  {
    title: "Feedback Analytics  ",
    path: "/feedback",
    cName: "nav-text ",
  },
  {
    path: "/support",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text disabled-link",
  },
  {
    path: "/support",
    icon: <AiIcons.AiOutlineBell />,
    cName: "nav-text disabled-link",
  },
  {
    path: "/support",
    icon: <AiIcons.AiOutlineSetting />,
    cName: "nav-text disabled-link",
  },
  {
    path: "/support",
    icon: <FiLogOut />,
    cName: "nav-text disabled-link",
  },
];
