# Security Advisory: React2Shell (CVE-2025-55182)

**Date:** December 9, 2025  
**Severity:** CRITICAL (CVSS 10.0)  
**Status:** PATCHED

## Summary

This project has been updated to address the critical React2Shell vulnerability (CVE-2025-55182), a remote code execution (RCE) vulnerability affecting React Server Components and Next.js applications.

## Vulnerability Details

- **CVE:** CVE-2025-55182 (React), CVE-2025-66478 (Next.js - duplicate)
- **Type:** Unauthenticated Remote Code Execution via insecure deserialization
- **Attack Vector:** Network (crafted HTTP request)
- **Affected Components:** React Server Components (RSC) "Flight" protocol

### What was vulnerable?

The vulnerability exists in the `react-server` package's handling of the RSC "Flight" protocol. Malformed payloads could bypass validation, allowing attacker-controlled data to execute privileged JavaScript code on the server.

## Previous Versions (VULNERABLE)

| Package | Vulnerable Version |
|---------|-------------------|
| react | 19.2.0 |
| react-dom | 19.2.0 |
| next | 16.0.1 |
| eslint-config-next | 16.0.1 |

## Updated Versions (PATCHED)

| Package | Patched Version |
|---------|-----------------|
| react | 19.2.1 |
| react-dom | 19.2.1 |
| next | 16.0.7 |
| eslint-config-next | 16.0.7 |

## Actions Taken

1. ✅ Updated `react` from 19.2.0 to 19.2.1
2. ✅ Updated `react-dom` from 19.2.0 to 19.2.1
3. ✅ Updated `next` from 16.0.1 to 16.0.7
4. ✅ Updated `eslint-config-next` from 16.0.1 to 16.0.7

## Deployment Instructions

After pulling these changes, run:

```bash
npm install
npm run build
```

Redeploy the application immediately.

## References

- [Wiz Blog: React2Shell Deep Dive](https://www.wiz.io/blog/critical-vulnerability-in-react-cve-2025-55182)
- [JFrog: React2Shell Detection & Mitigation](https://jfrog.com/blog/2025-55182-and-2025-66478-react2shell-all-you-need-to-know/)
- [CISA KEV Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- [AWS Security Blog: China-nexus exploitation](https://aws.amazon.com/blogs/security/china-nexus-cyber-threat-groups-rapidly-exploit-react2shell-vulnerability-cve-2025-55182/)

## Contact

For security concerns, contact the repository maintainers.
