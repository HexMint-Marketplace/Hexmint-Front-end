import {
  FaCreativeCommonsBy,
  FaLaptop,
  FaCreativeCommonsShare,
  FaExpeditedssl,
} from "react-icons/fa";

export const SideDataNormal = [
  {
    id: 0,
    icon: <FaLaptop />,
    text: "Dashboard",
    link: "/nadmin-dashboard",
  },
  {
    id: 1,
    icon: <FaCreativeCommonsShare />,
    text: "View Reports",
    link: "/nadmin-viewreports",
  },
  {
    id: 2,
    icon: <FaExpeditedssl />,
    text: "Blocked Users",
    link: "/nadmin-blockusers",
  },
  {
    id: 3,
    icon: <FaCreativeCommonsBy />,
    text: "View Users",
    link: "/nadmin-viewusers",
  },
];
