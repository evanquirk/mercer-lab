# Import Scripts

This directory contains scripts for importing data into Contentful.

## Import Publications from ORCID

Automatically imports publications from an ORCID profile to Contentful.

### Setup

1. **Get your ORCID ID**:
   - Visit https://orcid.org/ and find the researcher's ORCID ID
   - It looks like: `0000-0001-2345-6789`
   - Or extract from the Google Scholar profile's ORCID link if available

2. **Get a Contentful Management Token**:
   - Go to https://app.contentful.com/account/profile/cma_tokens
   - Click "Generate personal token"
   - Give it a name like "Publication Import"
   - Copy the token

3. **Update your `.env` file**:
   ```bash
   ORCID_ID=0000-0001-2345-6789
   CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here
   ```

### Usage

Run the import script:

```bash
npm run import-publications
```

The script will:
- Fetch all publications from the ORCID profile
- Check if they already exist in Contentful (by title)
- Import new publications with:
  - Title
  - Authors
  - Journal name
  - Publication year
  - DOI (if available)
  - URL to the DOI
  - Abstract (if available)
- Automatically publish the entries

### Adding Images to Publications

After importing, you can add images to publications in Contentful:

1. Go to your Contentful space
2. Find the Publication content type
3. Add a `featuredImage` field (Media - Single file)
4. Optionally add a `keywords` field (Short text - List) for automatic matching
5. Edit each publication to add relevant images

### Notes

- The script skips publications that already exist (matched by title)
- Rate limiting is built in to be nice to the ORCID API
- Publications are automatically published after import
- If the import fails, check that:
  - The ORCID ID is correct
  - The Contentful Management Token has write permissions
  - Your Contentful space has the "publication" content type

### Future Enhancements

You could extend this script to:
- Automatically fetch cover images from journals
- Match keywords to stock images
- Download PDFs if available
- Update existing publications instead of skipping them
