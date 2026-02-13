import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Button, Input, Card } from "../../components/common/UI";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password, role);
        if (result.success) {
            toast.success(`Welcome back!`);
            navigate(`/${role}/dashboard`);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm dark:bg-black/60"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full relative z-10 px-4"
            >
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/20">
                        <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">
                        SmartLeave
                    </h2>
                    <p className="mt-3 text-blue-100 font-medium text-lg">
                        Sign in to manage your leaves
                    </p>
                </div>

                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-white/40 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <Input
                                label="Email Address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@college.edu"
                                className="bg-white/50 dark:bg-gray-800/50"
                            />
                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-white/50 dark:bg-gray-800/50"
                            />

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                    Select Role
                                </label>
                                <div className="relative">
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none appearance-none transition-all cursor-pointer"
                                    >
                                        <option value="student">Student</option>
                                        <option value="faculty">Faculty</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full py-3.5 text-lg shadow-blue-500/25">
                            Sign In
                        </Button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
