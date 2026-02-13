import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    LayoutDashboard,
    FileText,
    History,
    Users,
    LogOut,
    Settings,
    ChevronRight
} from "lucide-react";
import { cn } from "../common/UI";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const links = {
        student: [
            { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
            { name: "Apply Leave", path: "/student/apply", icon: FileText },
            { name: "My History", path: "/student/history", icon: History },
        ],
        faculty: [
            { name: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
            { name: "Requests", path: "/faculty/requests", icon: FileText },
        ],
        admin: [
            { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
            { name: "Users", path: "/admin/users", icon: Users },
            { name: "All Leaves", path: "/admin/leaves", icon: FileText },
        ],
    };

    const currentLinks = links[user.role] || [];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none",
                !isOpen && "-translate-x-full lg:translate-x-0"
            )}
        >
            <div className="flex h-20 items-center px-6 border-b border-gray-100 dark:border-gray-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                        S
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            SmartLeave
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">MANAGEMENT</p>
                    </div>
                </div>
            </div>

            <nav className="mt-8 px-4 space-y-1.5">
                {currentLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden",
                                isActive
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"
                                />
                            )}
                            <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-gray-900 dark:group-hover:text-white")} />
                            <span className="font-medium">{link.name}</span>
                            {isActive && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-8 left-0 w-full px-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs ring-2 ring-white dark:ring-gray-700">
                            {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex w-full items-center justify-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
