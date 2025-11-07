#!/bin/bash

# Script to update all import paths after codebase reorganization

echo "Updating import paths..."

# Update @/lib/db -> @/lib/infrastructure/database
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/db'|from '@/lib/infrastructure/database'|g" {} +

# Update @/lib/services/* -> @/lib/core/services/*
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/services/AuthService'|from '@/lib/core/services/auth'|g" {} +
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/services/BlogService'|from '@/lib/core/services/content'|g" {} +
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/services/ProjectService'|from '@/lib/core/services/content'|g" {} +
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/services/CommentService'|from '@/lib/core/services/content'|g" {} +
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/services/StorageService'|from '@/lib/core/services/storage'|g" {} +
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/services/UserService'|from '@/lib/core/services/user'|g" {} +

# Update @/lib/validations -> @/lib/shared/validation
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/validations'|from '@/lib/shared/validation'|g" {} +

# Update @/lib/analytics -> @/lib/features/analytics
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/analytics'|from '@/lib/features/analytics'|g" {} +

# Update @/lib/email -> @/lib/features/email
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/email'|from '@/lib/features/email'|g" {} +

# Update @/lib/middleware/* -> @/lib/infrastructure/middleware/*
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/middleware/auth'|from '@/lib/infrastructure/middleware'|g" {} +
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/middleware/rateLimit'|from '@/lib/infrastructure/middleware'|g" {} +

# Update @/lib/hooks/* -> @/lib/hooks (already correct, but ensure consistency)
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '@/lib/hooks/useAuth'|from '@/lib/hooks'|g" {} +

echo "Import paths updated successfully!"
