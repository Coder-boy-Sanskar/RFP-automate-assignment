import cron from "node-cron";
import { checkEmails } from "../services/checkEmail.js";

console.log("📅 Email cron job initialized");

cron.schedule("*/1 * * * *", async () => {
  console.log("🔍 Checking email replies...");
  await checkEmails();
});
