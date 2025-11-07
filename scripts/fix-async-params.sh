#!/bin/bash

# Fix Next.js 16 async params in all dynamic route handlers

echo "Fixing async params in dynamic routes..."

# Find all route.ts files with [id] or [slug] in their path
find app/api -name "route.ts" -path "*\[*\]*" | while read file; do
  echo "Processing: $file"
  
  # Backup original
  cp "$file" "$file.bak"
  
  # Replace params type declarations
  sed -i '' 's/{ params }: { params: { \([^}]*\) } }/{ params }: { params: Promise<{ \1 }> }/g' "$file"
  
  # Add await params destructuring after try {
  # This is a simplified approach - manual review recommended
  
done

echo "Done! Please review changes and test."
echo "Backups saved with .bak extension"
