# MongoDB Atlas Automated Backups Setup

Protect your data with automated daily backups.

## Step 1: Access MongoDB Atlas Console

1. Go to https://cloud.mongodb.com
2. Log in to your organization (or create one)
3. Navigate to your cluster

## Step 2: Enable Automated Backups

1. Click on your cluster
2. Go to **Backup** tab (left sidebar → "Backups")
3. Look for "Automated Backup Policy"
4. Click **Edit Backup Policy** (or **Enable Automatic Backups** if not enabled)

## Step 3: Configure Backup Settings

**Recommended settings:**

| Setting | Value | Reason |
|---------|-------|--------|
| Daily Snapshots | ON | Daily incremental backups |
| Frequency | Once per day | Balances recovery vs. storage |
| Time | Off-peak hours (e.g., 2 AM UTC) | Minimal impact on performance |
| Retention | 35 days | Enough to recover from old bugs |
| Backup Location | Same region as cluster | Faster restore |

### Step-by-step:

1. **Frequency**: Select "Daily" (if not already)
2. **Hour**: Set to an off-peak time (2-6 AM UTC recommended)
3. **Retention Policy**: Set to "35 days"
4. Click **Save**

## Step 4: Create Point-in-Time Restore Window

Some plans support **Continuous Backup** (more frequent restores):

1. If available, enable "Continuous Backup"
2. This allows restore to ANY point in the last 7 days (not just daily snapshots)

## Step 5: Test Backup Restoration

**CRITICAL**: Test that backups work before relying on them.

### How to Restore a Backup

1. Go to **Backup** tab
2. Find a recent snapshot in the list
3. Click the **...** menu → **Restore**
4. Choose restore options:
   - Restore to new cluster (safer for testing)
   - Restore to the current cluster (destructive, use carefully!)
5. Click **Restore**
6. Wait for restore to complete (~5-30 minutes)
7. **Verify**: Check that data is intact
8. **Delete test cluster** if you created one

### Test Procedure (Recommended)

1. Create a test database on your cluster: `db.test.insertOne({test: true})`
2. Wait 1 hour
3. Restore an old backup to a NEW cluster
4. Verify the database wasn't restored (confirming older backup was restored)
5. Delete test cluster
6. **Result**: You now know backups work ✅

## Step 6: Set Up Backup Alerts

1. Go to **Alerts** (left sidebar)
2. Click **Create Alert**
3. Set trigger: "Backup Restore Failed"
4. Set notification: Email (your admin email)
5. Click **Save**

Repeat for:
- "Backup Snapshot Failed"
- "Restore Complete"

## Step 7: Document Your Backup Plan

Save this info somewhere safe (password manager, wiki, etc.):

```
MongoDB Atlas Backups
━━━━━━━━━━━━━━━━━━━━━━
Organization: [your org name]
Cluster: [your cluster name]
Admin Email: [your email]
Monthly Snapshot Test: Every 1st of month at 10 AM
Last Test: YYYY-MM-DD
Test Result: ✅ Pass / ❌ Fail
Contact: [person responsible for backups]
```

## Step 8: Schedule Monthly Restore Tests

Put this in your calendar:
- **Date**: 1st of every month
- **Task**: "Test MongoDB backup restore to new cluster"
- **Expected time**: 30-45 minutes
- **Success criteria**: Data matches expectations

## Troubleshooting

### Backup snapshot failed
- Check cluster is running (not paused)
- Check if backup window overlaps with large operations
- Check cluster has sufficient storage

### Can't restore a backup
- Verify backup status is "Ready" (not "In Progress")
- Try restoring to a NEW cluster instead of the same one
- Check if cluster is in the same region

### Backup retention is too short
- Upgrade your MongoDB plan (paid plans get more retention)
- Current: Free tier = 7 days, paid = 35 days

---

## Quick Reference

| Task | Frequency | Time Needed |
|------|-----------|------------|
| Enable backups | Once | 5 min |
| Test restore | Monthly | 30-45 min |
| Review backup logs | Weekly | 5 min |
| Update backup plan | Annually | 10 min |

## Next Steps

- [ ] Access MongoDB Atlas console
- [ ] Enable automated backups
- [ ] Set recommended retention (35 days)
- [ ] Test backup/restore process
- [ ] Set up alerts
- [ ] Schedule monthly tests
- [ ] Document backup procedure 🎯
