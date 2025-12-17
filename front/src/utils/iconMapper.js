import {
    FaHouse,
    FaEnvelope,
    FaBell,
    FaRegCircleUser,
    FaRegUser,
    FaUser,
    FaUserLock,
} from "react-icons/fa6";
import { MdSpeed, MdShowChart, MdManageAccounts, MdEmail } from "react-icons/md";
import { LuLogIn, LuLogOut, LuHistory } from "react-icons/lu";

export const iconMapper = {
    "reg-circle-user": FaRegCircleUser,
    "perfil": FaRegUser,
    "home": FaHouse,
    "login": LuLogIn,
    "envelope": FaEnvelope,
    "bell": FaBell,
    "login": LuLogIn,
    "logout": LuLogOut,
    "chart": MdShowChart,
    "history": LuHistory,
    "speed": MdSpeed,
    "people": MdManageAccounts,
    "password": FaUserLock,
    "email": MdEmail,
};
