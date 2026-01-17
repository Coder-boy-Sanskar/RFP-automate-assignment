import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "./modals/Vendor.js";

dotenv.config();

const vendors = [
  {
    name: "ABC Software Pvt Ltd",
    email: "contact@abcsoftware.com",
    categories: ["software"],
    contactPerson: "Rahul Sharma",
  },
  {
    name: "Fast Logistics",
    email: "sales@fastlogistics.com",
    categories: ["services"],
    contactPerson: "Neha Verma",
  },
  {
    name: "Global Supplies",
    email: "info@globalsupplies.com",
    categories: ["goods"],
    contactPerson: "Vikas Singh",
  },
  {
    name: "Arora Goods & Services",
    email: "sanskar.wrk@gmail.com",
    categories: ["goods"],
    contactPerson: "Sanskar Arora",
  },
  {
    name: "Arora Tech & Services Co",
    email: "sanskararora10282001@gmail.com",
    categories: ["software", "services"],
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
