import { FaEdit, FaLaptop, FaList } from "react-icons/fa";

export const SideData = [
  {
    id: 0,
    icon: <FaLaptop />,
    text: "Dashboard",
    link: "/sadmin-dashboard",
  },
  {
    id: 1,
    icon: <FaList />,
    text: "View Admin List",
    link: "/sadmin-viewadmins",
  },
  {
    id: 2,
    icon: <FaEdit />,
    text: "Edit Requests",
    link: "/sadmin-adminrequests",
  },
];
