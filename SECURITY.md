# 🔐 SECURITY GUIDE - Outil Chiffrage Atelier

## Document Version
- **Date**: 2026-05-01
- **Status**: ACTIVE
- **Last Updated**: v2.25

---

## 📋 TABLE OF CONTENTS
1. [Security Architecture](#security-architecture)
2. [Data Protection](#data-protection)
3. [Authentication & Authorization](#authentication--authorization)
4. [API Security](#api-security)
5. [XSS Prevention](#xss-prevention)
6. [CORS & MITM Protection](#cors--mitm-protection)
7. [Incident Response](#incident-response)
8. [Compliance](#compliance)

---

## Security Architecture

### Application Type
- **Offline-First PWA**: Data stored locally in browser localStorage
- **No Backend Server**: No external APIs called except optional email webhooks
- **Client-Side Only**: All processing happens in the browser

### Trust Model
- ✅ **Trusted**: Local machine (where app runs)
- ⚠️ **Untrusted**: Network (for webhook calls only)
- ❌ **Not Trusted**: Browser extensions, local storage compromise

---

## Data Protection

### Sensitive Data Classification

#### 🔴 CRITICAL (Encrypted in localStorage)
- **PIN Codes**: Stored as SHA-256 hashes
- **API Keys**: Encrypted with XOR cipher + salt
- **Beneficiary Details**: Names, medical history (plaintext - see recommendations)

#### 🟡 MEDIUM (Plaintext - Acceptable)
- Prestation information (client names, references)
- Cost calculations and quotes
- Procedure templates
- User preferences

#### 🟢 LOW (Public)
- Application metadata
- UI state (tab order, collapsed sections)
- Analytics aggregates

### Encryption Methods

#### PIN Hashing (Critical)
```javascript
// Using Web Crypto API - SHA-256
async function hashPin(pin) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // Convert to hex string
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
```

#### API Key Encryption (Medium)
```javascript
// XOR cipher with salt stored in localStorage
function encryptApiKey(key) {
    const salt = localStorage.getItem('_secSalt') || generateSalt();
    localStorage.setItem('_secSalt', salt);
    // XOR each character with salt
    return btoa(...); // Base64 encode
}
```

**⚠️ Note**: XOR is lightweight but not production-grade. For enhanced security, consider:
- TweetNaCl.js (loaded but not yet integrated)
- Hardware security modules (HSM)
- Key management services (AWS KMS, Azure Key Vault)

---

## Authentication & Authorization

### PIN System
- **Length**: 4-8 digits
- **Storage**: SHA-256 hash in localStorage
- **Verification**: Async comparison
- **Brute Force Protection**: None (offline app)
  - ⚠️ Recommendation: Implement retry limits + cooldowns

### Group-Based Access Control
```javascript
defaultAuthGroups = [
    { id: 'cea', name: 'CEA', passwordHash: null, tabs: [...] },
    { id: 'asp', name: 'ASP', passwordHash: null, tabs: [...] },
    { id: 'msp', name: 'MSP', passwordHash: null, tabs: [...] },
    { id: 'admin', name: 'ADMIN', passwordHash: null, tabs: ['*'] }
];
```

**Current State**: passwordHash not utilized  
**Recommendation**: Implement group-level passwords if needed

### Session Management
- **Offline**: No server sessions
- **Local**: SessionStorage + localStorage
- **Duration**: Persistent until localStorage cleared
- **Logout**: localStorage cleanup

---

## API Security

### Email Webhooks (Only External API)
- **Type**: POST to external webhook URL
- **Auth**: Bearer token in Authorization header
- **Storage**: API key encrypted in localStorage
- **CORS**: N/A (CORS not applicable for offline-first)
- **Validation**: Basic event type validation

### Security Checklist for Webhooks
```javascript
// ✅ IMPLEMENTED
- API key encrypted before storage
- Payload validated
- Retry logic with exponential backoff

// ⚠️ RECOMMENDED
- Add webhook signature verification (HMAC)
- Implement webhook rate limiting
- Add request timeout
- Log webhook attempts & failures
```

---

## XSS Prevention

### escapeHtml() Function
```javascript
function escapeHtml(text) {
    if (!text) return '';
    const map = { 
        '&': '&amp;', '<': '&lt;', '>': '&gt;', 
        '"': '&quot;', "'": '&#39;' 
    };
    return String(text).replace(/[&<>"']/g, char => map[char]);
}
```

### Usage Guidelines

#### ✅ SAFE
```javascript
// User input always escaped
el.innerHTML = `<div>${escapeHtml(userInput)}</div>`;

// Static content
el.innerHTML = `<div>Static HTML</div>`;
```

#### ❌ DANGEROUS
```javascript
// Direct concatenation without escape
el.innerHTML = userInput; // UNSAFE!

// Data from localStorage without validation
el.innerHTML = localStorage.data; // UNSAFE!
```

### Current Status
- ✅ escapeHtml() implemented correctly
- ✅ Used for: beneficiary names, prestation details, notes
- ⚠️ Not used for: Some internal labels (bundle.label, etc.)
- 🟢 Risk: LOW (all user inputs eventually escaped)

---

## CORS & MITM Protection

### Subresource Integrity (SRI)
All external scripts have SRI hashes:
```html
<!-- Example: html2pdf.js -->
<script integrity="sha512-5qsSq1z..." crossorigin="anonymous" 
    src="https://cdnjs.cloudflare.com/...">
```

### Content Security Policy (CSP)
```
default-src 'self'
script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
frame-ancestors 'none'
```

**Note**: 'unsafe-inline' required for inline styles/scripts. Can be removed by:
1. Extracting inline styles to external CSS
2. Using nonce-based CSP

---

## Incident Response

### Data Breach Scenarios

#### Scenario 1: localStorage Compromised
**Impact**: All data visible, including encrypted API keys  
**Response**:
1. Regenerate API keys
2. Clear browser data
3. Update encryption salt
4. Review export history

#### Scenario 2: PIN Compromised
**Impact**: Access to PIN-protected areas  
**Response**:
1. Change PIN immediately
2. Review action logs
3. Export data backup
4. Clear localStorage if needed

#### Scenario 3: Browser Extension Hijack
**Impact**: All data accessible to extension  
**Response**:
1. Audit installed extensions
2. Disable untrusted extensions
3. Review data access logs
4. Consider encryption at rest

---

## Compliance

### GDPR Compliance
- ✅ Data stored locally (no data transfer outside browser)
- ✅ User can export their data (JSON, CSV formats)
- ✅ User can delete all data (clear browser storage)
- ⚠️ Missing: Privacy policy, data retention policy

### Data Retention
- **Default**: Persists until user clears browser data
- **Recommended**: Implement automatic backups & archival
- **Snapshots**: Up to 3 timestamped snapshots in localStorage

### Audit & Logging
- ✅ Action logging implemented
- ⚠️ Logs stored in localStorage (not encrypted)
- Recommendation: Add log rotation & export

---

## SECURITY CHECKLIST

### Before Production Release
- [ ] Update weak passwords/hashes from old data
- [ ] Test PIN hashing with various inputs
- [ ] Verify API key encryption/decryption works
- [ ] Validate CSP doesn't break functionality
- [ ] Test SRI hash updates
- [ ] Security audit of user-generated content
- [ ] Penetration testing (XSS, CSRF)
- [ ] Load testing (localStorage limits)

### Ongoing Maintenance
- [ ] Monitor CDN for vulnerability updates
- [ ] Review SRI hashes quarterly
- [ ] Update TweetNaCl.js if crypto ops needed
- [ ] Log security incidents
- [ ] User security training
- [ ] Backup strategy documentation

---

## FUTURE IMPROVEMENTS

### High Priority
1. **Password-Protected Groups**: Implement group authentication
2. **Retry Limits**: Add brute-force protection for PIN
3. **Data Encryption at Rest**: Use TweetNaCl for stronger encryption
4. **Webhook Signatures**: HMAC-based verification
5. **Audit Logs Encryption**: Encrypt logs in localStorage

### Medium Priority
1. **Hardware Security Keys**: Support WebAuthn/FIDO2
2. **Biometric Auth**: Fingerprint/Face recognition
3. **Export Encryption**: Password-protected exports
4. **Data Sync**: Encrypted cloud backup option
5. **Rate Limiting**: Webhook call throttling

### Low Priority
1. **Penetration Testing**: Professional security audit
2. **Bug Bounty Program**: External vulnerability reporting
3. **Security Training**: User education on data protection
4. **Compliance**: ISO 27001, SOC 2 certifications

---

## CONTACT & SUPPORT

**Security Contact**: [security@example.com]  
**Responsible Disclosure**: Report vulnerabilities confidentially  
**Last Security Review**: 2026-05-01  
**Next Review Date**: 2026-08-01

---

**Document Status**: ✅ ACTIVE & MAINTAINED  
**Audience**: Developers, DevOps, Security Team  
**Distribution**: Internal Only
