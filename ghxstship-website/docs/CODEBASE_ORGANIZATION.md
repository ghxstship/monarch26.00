# GHXSTSHIP Website - Codebase Organization

**Date:** November 6, 2025  
**Status:** ✅ Complete

## Overview

The GHXSTSHIP website repository has been cleaned and organized. **ghxstship-website IS the root project** - the Monarch26.00 folder is just a container directory.

---

## Repository Structure

```
Monarch26.00/                    # Container directory
├── .git/                       # Git repository
├── .gitignore                  # Git ignore rules
└── ghxstship-website/          # ← THE ROOT PROJECT
    ├── .github/                # GitHub Actions workflows (CI/CD)
    ├── app/                    # Next.js app directory
    ├── components/             # React components
    ├── design-system/          # Design tokens and system
    ├── docs/                   # Documentation
    │   ├── CODEBASE_ORGANIZATION.md  # This file
    │   ├── buildprompt        # Full stack development brief (1,613 lines)
    │   ├── ui-ux-audit/       # UI/UX documentation
    │   │   └── UX Audit      # Atomic design system audit (2,295 lines)
    │   └── archive/           # Historical documentation and audit reports
    ├── lib/                    # Utilities and services
    ├── public/                 # Static assets
    ├── README.md               # Project readme
    ├── DEPLOYMENT.md           # Deployment guide
    ├── package.json            # Dependencies
    └── [other project files]
```

---

## Changes Made

### 1. Consolidated Everything into ghxstship-website
- **Moved:** `UI/` → `docs/ui-ux-audit/`
- **Moved:** `CODEBASE_ORGANIZATION.md` → `docs/`
- **Removed:** Root `.github/` directory (ghxstship-website has its own)
- **Result:** Monarch26.00 now contains ONLY `.git/`, `.gitignore`, and `ghxstship-website/`

### 2. Documentation Organization
- **Created:** `docs/archive/` for historical documentation
- **Organized:** All audit and completion reports into archive (30+ files)
- **Kept in project root:** `README.md`, `DEPLOYMENT.md` (active documentation)
- **Centralized:** All documentation in `docs/` directory

---

## Key Files

### UI/UX Audit
**Location:** `docs/ui-ux-audit/UX Audit`  
**Purpose:** Comprehensive atomic design system and UI/UX audit framework  
**Size:** 2,295 lines  
**Content:**
- Mission-critical directives for token-first architecture
- Phase-by-phase audit framework
- Design token implementation guidelines
- Responsive design requirements
- Accessibility compliance (WCAG 2.2 AAA)
- Internationalization (i18n) requirements
- Data compliance (GDPR/CCPA)

### Build Prompt
**Location:** `docs/buildprompt`  
**Purpose:** Full stack development brief for GHXSTSHIP website  
**Size:** 1,613 lines  
**Content:**
- Project overview and company information
- Design system (monochromatic B&W aesthetic)
- Typography system (Anton, Bebas Neue, Share Tech)
- Tech stack (Next.js 14+, TypeScript, Tailwind CSS)
- Complete site structure and page specifications
- Development phases and implementation guide
- Performance, SEO, and accessibility requirements

---

## Directory Purpose

### `docs/ui-ux-audit/`
Contains UI/UX audit documentation and design system guidelines. This is the source of truth for design system implementation.

### `docs/`
All project documentation:
- `buildprompt` - Development brief and specifications
- `ui-ux-audit/` - Design system audit framework
- `archive/` - Historical audit reports and completion documents
- `CODEBASE_ORGANIZATION.md` - This file

### Project Root
The GHXSTSHIP website - a Next.js 14+ application with:
- Contemporary minimal pop art aesthetic (pure B&W)
- Atomic design system implementation
- Full-stack features (authentication, admin dashboard, etc.)
- Comprehensive documentation in `docs/`

---

## Architecture Principles

1. **Minimal Root:** Only essential directories in the root
2. **Project Isolation:** Each project (ghxstship-website) is self-contained
3. **Documentation Hierarchy:** 
   - Root level: Cross-project documentation (UI/UX Audit)
   - Project level: Project-specific docs (buildprompt, README, DEPLOYMENT)
   - Archive: Historical/completed documentation
4. **Single Source of Truth:** Design system defined in UI/UX Audit, implemented in ghxstship-website

---

## Next Steps

1. **Development:** Follow the buildprompt specifications for website implementation
2. **Design System:** Reference UI/UX Audit for all design decisions
3. **Documentation:** Keep README.md and DEPLOYMENT.md updated as project evolves
4. **Archive Management:** Move completed audit reports to archive as new ones are created

---

## Notes

- The `.github/` directory in ghxstship-website contains CI/CD workflows for automated testing and deployment
- All historical audit reports are preserved in `ghxstship-website/docs/archive/`
- The design system audit (UI/UX Audit) should be considered the authoritative source for all design decisions
- The buildprompt provides comprehensive specifications for the GHXSTSHIP website implementation

---

**Maintained by:** Cascade AI  
**Last Updated:** November 6, 2025
