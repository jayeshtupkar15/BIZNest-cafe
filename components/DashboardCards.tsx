"use client";
import { motion } from "framer-motion";

const cardData = [
  { title: "Total Revenue", value: "$12,450", icon: "💰" },
  { title: "Today's Orders", value: "87", icon: "📝" },
  { title: "New Customers", value: "12", icon: "🤝" },
];

export default function DashboardCards() {
  return (
    <>
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100 flex items-center justify-between"
        >
          <div>
            <p className="text-gray-500 font-medium">{card.title}</p>
            <p className="text-3xl font-bold text-[#3b2b20] mt-1">{card.value}</p>
          </div>
          <span className="text-4xl">{card.icon}</span>
        </motion.div>
      ))}
    </>
  );
}