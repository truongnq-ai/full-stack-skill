---
name: Cloud Storage Integration
description: Universal standards and patterns for integrating with cloud storage providers (Google Drive, AWS S3, etc.)
metadata:
  labels:
    - cloud
    - storage
    - google-drive
    - aws-s3
    - file-management
    - oauth2
    - common
    - cloud-storage
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '*storage*'
      - '*drive*'
      - '*upload*'
      - '*download*'
    keywords:
      - google drive
      - s3
      - file upload
      - cloud storage
      - file management
workflow_ref: ui-ux-pro-max
---

# Cloud Storage Integration

## **Priority: P0 (CRITICAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Directory Structure

```text
src/
└── infrastructure/
    └── storage/
        ├── storage_provider.ext      # Abstract interface
        ├── google_drive_impl.ext     # Concrete implementation
        └── s3_impl.ext               # Concrete implementation
```

## Core Guidelines

- **Use Interfaces**: Define abstract `StorageProvider` interfaces.
- **Stream Large Files**: Always use streams for upload/download.
- **Chunked Uploads**: Implement resumable uploads for files > 5MB.
- **Secure Credentials**: Inject API keys/tokens via environment variables.
- **Rate Limiting**: Implement exponential backoff for API rate limits.
- **Metadata Management**: Store file metadata (ID, path, size) in local database.
- **Access Control**: Use pre-signed URLs or temporary tokens for client downloads.

## Anti-Patterns

- **No Vendor Lock-in**: Depend on abstractions, not direct vendor SDKs.
- **No Memory Buffering**: Stream files directly, never load entire files into RAM.
- **No Public Folders**: Keep root storage private, use temporary access links.
- **No Hardcoded Paths**: Use configuration for root folders and environment partitioning.

## Reference Links

- [Folder & Naming Standards](references/folder-structure.md)
- [Upload & Validation Strategies](references/upload-strategies.md)
- [Auth & Permissions](references/auth-permissions.md)
- [History & Versioning](references/history-versioning.md)
- [Drive Limits & Quotas](references/google-drive-limits.md)
- [Error Handling](references/error-handling.md)
- [Download Strategies](references/download-strategies.md)
- [Permissions Model](references/permissions-model.md)
- [Quota Monitoring](references/quota-monitoring.md)
- [Migration Strategy](references/migration-strategy.md)


## References

- [Examples (Input/Output)](references/examples.md)
