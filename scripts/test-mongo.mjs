/**
 * scripts/test-mongo.mjs — Kiểm tra MONGODB_URI kết nối Atlas được không.
 * Chạy: node scripts/test-mongo.mjs
 * Không in password ra console.
 */
import { readFileSync } from "fs";
import { MongoClient } from "mongodb";

const env = readFileSync(".env.local", "utf8");
for (const line of env.split(/\r?\n/)) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("FAIL: thiếu MONGODB_URI trong .env.local");
  process.exit(1);
}

const masked = uri.replace(/\/\/.*@/, "//***@");
console.log("URI host:", masked);

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db("mini_nextgpu");
  await db.command({ ping: 1 });
  const cols = await db.listCollections().toArray();
  console.log("CONNECT OK — db=mini_nextgpu");
  console.log(
    "collections:",
    cols.map((c) => c.name).join(", ") || "(empty — seed khi gọi API lần đầu)",
  );
} catch (err) {
  console.error("CONNECT FAIL:", err instanceof Error ? err.message : err);
  process.exit(1);
} finally {
  await client.close();
}
