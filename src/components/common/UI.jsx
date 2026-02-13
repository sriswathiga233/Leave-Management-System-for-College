import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const Button = ({ children, className, variant = "primary", ...props }) => {
    const variants = {
        primary: "btn-gradient",
        secondary: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md",
        outline: "border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30",
        success: "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30",
        ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(
                "px-5 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                variants[variant] || variants.primary,
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export const Input = ({ label, error, className, ...props }) => (
    <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{label}</label>}
        <input
            className={cn(
                "glass-input px-4 py-3 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 w-full",
                error ? "border-red-500 focus:ring-red-500/50" : "",
                className
            )}
            {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1 font-medium">{error}</span>}
    </div>
);

export const Card = ({ children, className, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
            "glass-panel rounded-2xl p-6 sm:p-8",
            className
        )}
        {...props}
    >
        {children}
    </motion.div>
);
