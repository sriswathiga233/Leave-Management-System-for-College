import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Menu, Moon, Sun, Bell } from "lucide-react";

const Layout = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) return <Outlet />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Sidebar isOpen={sidebarOpen} />

            <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    <div className="flex flex-1 justify-end items-center gap-4">
                        <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Welcome, {user.name} ({user.role})
                        </span>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-600" />
                            )}
                        </button>
                        <div className="relative">
                            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white dark:ring-gray-800">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
