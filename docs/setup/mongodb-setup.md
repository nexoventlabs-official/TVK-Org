# MongoDB Atlas Setup Guide (5 minutes)

## Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google account
3. Choose **FREE** tier (M0 Sandbox)

## Step 2: Create Cluster
1. After login, click **"Build a Database"**
2. Choose **FREE** tier (M0)
3. Select a cloud provider (AWS recommended)
4. Choose region closest to you (e.g., Mumbai for India)
5. Cluster name: `Cluster0` (default is fine)
6. Click **"Create Cluster"** (takes 1-3 minutes)

## Step 3: Create Database User
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `venkatraman`
5. Password: Click **"Autogenerate Secure Password"** (copy it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Allow Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

## Step 5: Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://venkatraman:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with the password you copied in Step 3
7. Add database name at the end: `/venkatraman`

## Step 6: Update .env File
Open: `D:\MLA Mylapore\p.-venkatraman-official-main\Back end reference\tvkgallery-main\backend\.env`

Replace the MONGODB_URI line with your connection string:
```env
MONGODB_URI=mongodb+srv://venkatraman:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/venkatraman?retryWrites=true&w=majority
```

## Step 7: Test Connection
```bash
cd "D:\MLA Mylapore\p.-venkatraman-official-main\Back end reference\tvkgallery-main\backend"
npm run dev
```

You should see:
```
[mongo] connected
[server] listening on :5050
```

---

## Quick Reference

**Free Tier Limits:**
- Storage: 512 MB
- RAM: Shared
- Connections: 500 concurrent
- Perfect for development and small projects!

**Connection String Format:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME
```

**Example:**
```
mongodb+srv://venkatraman:MyP@ssw0rd123@cluster0.abc123.mongodb.net/venkatraman
```

---

## Troubleshooting

**Error: "Authentication failed"**
- Check password is correct (no spaces)
- Ensure user has "Read and write" privileges

**Error: "Connection timeout"**
- Check Network Access allows your IP
- Try "Allow Access from Anywhere" for testing

**Error: "Server selection timeout"**
- Check internet connection
- Verify connection string format is correct
- Ensure cluster is active (not paused)

---

Once you have your MongoDB connection string, update the `.env` file and we can start the backend!
