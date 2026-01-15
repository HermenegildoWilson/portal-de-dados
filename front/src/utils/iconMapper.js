import {
    FaEnvelope,
    FaUser,
    FaUserLock,
    FaIdCard,
    FaUserShield,
} from "react-icons/fa6";
import { MdSpeed, MdEmail } from "react-icons/md";
import { LuHistory, LuMail } from "react-icons/lu";
import { Dashboard, People, Mail, Settings, Notifications, AccountCircle, Home, Login, Logout, PersonAdd, History, Person, Email, Phone,  } from "@mui/icons-material";
import { FaCalendarAlt } from "react-icons/fa";
import { Thermostat, WaterDrop, Air, Speed } from "@mui/icons-material";

export const iconMapper = {
    "id": FaIdCard,
    "nome": Person,
    "email": Email,
    "telefone": Phone,
    "role": FaUserShield,
    "perfil": AccountCircle,
    "home": Home,
    "login": Login,
    "envelope": FaEnvelope,
    "bell": Notifications,
    "logout": Logout,
    "cadastrar": PersonAdd,
    "chart": History,
    "history": LuHistory,
    "speed": MdSpeed,
    "password": FaUserLock,
    "email": MdEmail,
    "dashboard": Dashboard,
    "people": People,
    "mail": Mail,
    "configuracoes": Settings,
    "datacadastro": FaCalendarAlt,
    "dispositivos": Settings,
    "Temperatura": Thermostat,
    "Humidade": WaterDrop,
    "Pressão do Ar": Speed,
    "Qualidade do Ar": Air,
};
