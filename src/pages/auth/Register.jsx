import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Button, Input, Card } from "../../components/common/UI";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        dept: "",
        regNo: "",
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        const dataToSubmit = { ...formData };
        if (dataToSubmit.role === 'student') {
            dataToSubmit.leaveBalance = 20;
        }

        const result = register(dataToSubmit);
        if (result.success) {
            toast.success("Registration successful!");
            navigate(`/${formData.role}/dashboard`);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center py-10">
            <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm dark:bg-black/60"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full relative z-10 px-4"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/20">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                        Create Account
                    </h2>
                    <p className="text-indigo-100 mt-2">Join SmartLeave today</p>
                </div>

                <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-white/40 dark:border-gray-700">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                        />

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                    Role
                                </label>
                                <div className="relative">
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
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

                            <Input
                                label="Department"
                                name="dept"
                                required
                                value={formData.dept}
                                onChange={handleChange}
                                placeholder="e.g. CS"
                            />
                        </div>

                        {formData.role === "student" && (
                            <Input
                                label="Register Number"
                                name="regNo"
                                required
                                value={formData.regNo}
                                onChange={handleChange}
                                placeholder="e.g. 2023CS001"
                            />
                        )}

                        <Button type="submit" className="w-full py-3.5 mt-2 text-lg">
                            Register Now
                        </Button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 pt-2">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default Register;
