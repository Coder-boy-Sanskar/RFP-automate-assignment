import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "./modals/Vendor.js";

dotenv.config();

const vendors = [
  {
    name: "Sanskar Software Solutions",
    email: "sanskar@yal.chat",
    categories: ["software"],
    contactPerson: "Sanskar Kumar",
  },
  {
    name: "CodeWave Technologies",
    email: "sales@codewave.com",
    categories: ["software"],
    contactPerson: "Rohit Mehra",
  },
  {
    name: "NextGen Softwares",
    email: "info@nextgensoft.com",
    categories: ["software"],
    contactPerson: "Anjali Sharma",
  },
  {
    name: "Nova IT Services",
    email: "sales@novaitservices.com",
    categories: ["services"],
    contactPerson: "Priya Mehta",
  },
  {
    name: "QuickServe Solutions",
    email: "support@quickserve.com",
    categories: ["services"],
    contactPerson: "Vivek Joshi",
  },
  {
    name: "Prime Business Services",
    email: "contact@primebizservices.com",
    categories: ["services"],
    contactPerson: "Neha Verma",
  },
  {
    name: "Global Goods Suppliers",
    email: "info@globalgoods.com",
    categories: ["goods"],
    contactPerson: "Rohit Singh",
  },
  {
    name: "Metro Trade Corporation",
    email: "sales@metrotrade.com",
    categories: ["goods"],
    contactPerson: "Sanjay Patel",
  },
  {
    name: "Universal Supplies Co",
    email: "orders@universalsupplies.com",
    categories: ["goods"],
    contactPerson: "Kunal Shah",
  },
  {
    name: "Unified Tech & Services",
    email: "business@unifiedtech.com",
    categories: ["software", "services"],
    contactPerson: "Pooja Malhotra",
  },
  {
    name: "TechNova Solutions",
    email: "contact@technova.com",
    categories: ["software", "services"],
    contactPerson: "Arjun Rao",
  },
  {
    name: "OmniTrade Services",
    email: "info@omnitrade.com",
    categories: ["services", "goods"],
    contactPerson: "Rakesh Gupta",
  },
  {
    name: "SmartSupply Systems",
    email: "sales@smartsupply.com",
    categories: ["software", "goods"],
    contactPerson: "Nitin Agarwal",
  },
  {
    name: "Enterprise Hub Pvt Ltd",
    email: "connect@enterprisehub.com",
    categories: ["software", "services", "goods"],
    contactPerson: "Deepak Mishra",
  },
  {
    name: "Sanskar Enterprise (Test Vendor)",
    email: "sanskararora10282001@gmail.com",
    categories: ["software", "services", "goods"],
    contactPerson: "Sanskar Arora",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Vendor.deleteMany(); // optional: clean old data
    await Vendor.insertMany(vendors);

    console.log("Vendors inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
