# Publication Import Setup Guide

This guide will help you automatically import publications from ORCID (which can be linked to Google Scholar) into your Contentful space.

## 🎯 Overview

Instead of manually entering publications, you can:
1. Link Google Scholar to ORCID
2. Run a script that pulls all publications from ORCID
3. Automatically populate Contentful with publication data
4. Optionally add images to publications

---

## 📋 Prerequisites

### 1. ORCID Account Setup

**Option A: If the researcher already has an ORCID ID**
- Just find their ORCID ID (looks like `0000-0001-2345-6789`)
- You can find it on their ORCID profile or Google Scholar page

**Option B: If they don't have an ORCID ID yet**
1. Go to https://orcid.org/register
2. Create a free account
3. Once created, you'll get an ORCID ID like `0000-0001-2345-6789`

### 2. Link Google Scholar to ORCID

1. Log into the ORCID account at https://orcid.org/signin
2. Click on "Add works" or "Works" section
3. Click "Search & link"
4. Find and connect Google Scholar:
   - Click "Search & link" next to Google Scholar
   - Or use "Add works from other systems"
5. Authorize the connection
6. All Google Scholar publications will sync to ORCID

### 3. Get Contentful Management Token

1. Log into Contentful: https://app.contentful.com
2. Go to Settings → CMA Tokens: https://app.contentful.com/account/profile/cma_tokens
3. Click "Generate personal token"
4. Name it something like "Publication Import"
5. Copy the token (you won't see it again!)

---

## ⚙️ Configuration

### Update your `.env` file

Add these variables to your `.env` file:

```env
# ORCID ID (format: 0000-0001-2345-6789)
ORCID_ID=YOUR_ORCID_ID_HERE

# Contentful Management Token (from step 3 above)
CONTENTFUL_MANAGEMENT_TOKEN=YOUR_TOKEN_HERE

# Environment (usually "master")
CONTENTFUL_ENVIRONMENT=master
```

---

## 🚀 Running the Import

### First Time Import

```bash
npm run import-publications
```

This will:
- ✅ Fetch all publications from ORCID
- ✅ Check if they already exist in Contentful
- ✅ Import new publications with full metadata
- ✅ Automatically publish them

### Expected Output

```
📚 Fetching publications for ORCID 0000-0001-2345-6789...
✅ Found 42 publications

📝 Importing to Contentful...
✅ Imported: "Structural basis of prion strain diversity" (2024)
✅ Imported: "Novel therapeutic approaches to prion diseases" (2024)
⏭️  Skipping "Previous publication" (already exists)
...

📊 Import Summary:
   ✅ Imported: 35
   ⏭️  Skipped: 7
   ❌ Errors: 0

🎉 Import complete!
```

### Re-running the Import

You can safely re-run the script anytime:
- It will skip publications that already exist
- Only new publications will be imported
- This is useful for keeping publications up-to-date

---

## 🖼️ Adding Images to Publications

### Option 1: Manual Upload (Simple)

1. Go to Contentful: https://app.contentful.com
2. Navigate to your space
3. Go to Content → Publications
4. Open a publication entry
5. Upload an image to the "Featured Image" field
6. Save and publish

### Option 2: Update Content Model (For automatic matching later)

1. In Contentful, go to Content model → Publication
2. Add these fields if not present:
   - **Featured Image** (Media - Single file)
   - **Keywords** (Short text - List)

3. For each publication:
   - Add relevant keywords (e.g., "cryo-em", "neuroscience", "protein")
   - These can later be used to automatically match stock images

### Option 3: Batch Upload via Script (Advanced)

You could extend the import script to:
- Download journal cover images
- Fetch images from DOI metadata
- Match keywords to stock photo services
- Upload to Contentful automatically

---

## 🔄 Keeping Publications Updated

### Schedule Regular Imports

Set up a cron job or GitHub Action to run monthly:

```yaml
# .github/workflows/import-publications.yml
name: Import Publications
on:
  schedule:
    - cron: '0 0 1 * *'  # First day of every month
  workflow_dispatch:  # Allow manual trigger

jobs:
  import:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run import-publications
        env:
          ORCID_ID: ${{ secrets.ORCID_ID }}
          CONTENTFUL_MANAGEMENT_TOKEN: ${{ secrets.CONTENTFUL_MANAGEMENT_TOKEN }}
```

---

## 📊 What Data Gets Imported

From ORCID, the script imports:
- ✅ Publication title
- ✅ Authors list
- ✅ Journal name
- ✅ Publication year
- ✅ DOI (if available)
- ✅ Direct link to DOI
- ✅ Abstract (if available)

**Not imported** (can be added manually):
- Featured images
- PDF files
- Keywords/tags

---

## 🐛 Troubleshooting

### "ORCID API error: 404"
- Check that the ORCID ID is correct
- Make sure the ORCID profile is public

### "Contentful API error: Unauthorized"
- Verify your Contentful Management Token is correct
- Ensure the token has write permissions
- Check the token hasn't expired

### "No publications found"
- Ensure publications are linked to the ORCID account
- Verify Google Scholar is connected to ORCID
- Check the ORCID profile visibility settings

### Publications appear but with missing data
- Some journals don't provide full metadata to ORCID
- You can manually edit the entries in Contentful to add missing info

---

## 💡 Tips

1. **Regular syncing**: Run the import monthly to catch new publications
2. **Add images selectively**: Not every publication needs an image
3. **Use keywords**: Add keywords to help filter and search
4. **Check Google Scholar link**: Make sure Google Scholar is connected to ORCID for complete data

---

## 🔗 Useful Links

- ORCID: https://orcid.org
- Contentful: https://app.contentful.com
- Google Scholar: https://scholar.google.com
- Script documentation: `/scripts/README.md`
