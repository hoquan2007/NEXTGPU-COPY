/**
 * scripts/test-m3-seed.mjs — Seed thử users + machines (không cần Clerk).
 * Chạy: node scripts/test-m3-seed.mjs
 */
import { readFileSync } from "fs";
import { MongoClient } from "mongodb";

const env = readFileSync(".env.local", "utf8");
for (const line of env.split(/\r?\n/)) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
await client.connect();
const db = client.db("mini_nextgpu");

const users = db.collection("users");
const existing = await users.findOne({ clerkId: "test_seed_user" });
if (!existing) {
  await users.insertOne({
    clerkId: "test_seed_user",
    email: "seed@test.local",
    balance: 100000,
    createdAt: new Date(),
  });
  console.log("SEED user OK — balance 100000");
} else {
  console.log("user đã có — balance:", existing.balance);
}

const machines = db.collection("machines");
if ((await machines.countDocuments()) === 0) {
  await machines.insertMany([
    { name: "Starter RTX 3060", gpu: "RTX 3060 12GB", pricePerHour: 8000, status: "available" },
    { name: "Pro RTX 4070", gpu: "RTX 4070 12GB", pricePerHour: 15000, status: "available" },
    { name: "Ultra RTX 4090", gpu: "RTX 4090 24GB", pricePerHour: 35000, status: "available" },
  ]);
  console.log("SEED machines OK — 3 máy");
} else {
  console.log("machines đã có — count:", await machines.countDocuments());
}

const cols = await db.listCollections().toArray();
console.log("collections:", cols.map((c) => c.name).join(", "));
await client.close();
console.log("M3 seed check DONE");
