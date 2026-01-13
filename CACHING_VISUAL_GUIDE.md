# API Caching System - Visual Guide

## 🔄 How Caching Works

### First Request (Cache Miss)

```
User calls: fetchWithCache("/api/projects")
    ↓
Check localStorage for "cache:/api/projects"
    ↓
❌ Not found (cache miss)
    ↓
🌐 Fetch from API
    ↓
✅ Response received
    ↓
💾 Store in localStorage with TTL
    ↓
📦 Return data
```

### Subsequent Request (Cache Hit)

```
User calls: fetchWithCache("/api/projects")
    ↓
Check localStorage for "cache:/api/projects"
    ↓
✅ Found! Check expiration
    ↓
Is cache expired? (TTL exceeded)
    ↓
❌ NO → Return cached data (instant!)
```

### Expired Cache

```
User calls: fetchWithCache("/api/projects")
    ↓
Check localStorage
    ↓
✅ Found, but expired
    ↓
🗑️ Remove expired entry
    ↓
🌐 Fetch fresh from API
    ↓
💾 Store new data with TTL
    ↓
📦 Return fresh data
```

---

## 📊 Cache Storage Structure

### Stored in localStorage

```json
{
  "cache:/api/projects": {
    "data": [
      { "id": 1, "title": "Project A", ... },
      { "id": 2, "title": "Project B", ... }
    ],
    "timestamp": 1705084800000,
    "ttl": 900000
  }
}
```

### What Happens:

- **timestamp**: When cache was created
- **ttl**: Expiration time in milliseconds
- **age** = now - timestamp
- **valid** = age < ttl

### Example Timeline

```
12:00:00 - Cache created (timestamp: 1705084800000)
           TTL: 900000 (15 minutes)
           ↓
12:05:00 - age: 300000 → Still valid ✅
12:10:00 - age: 600000 → Still valid ✅
12:14:00 - age: 840000 → Still valid ✅
12:15:00 - age: 900000 → EXPIRED ❌
           → Removed automatically
           → Fresh fetch on next request
```

---

## 🎯 Decision Tree

```
Need to fetch API data?
    ↓
Is it sensitive data?
    ├─ YES (tokens, passwords) → Use memory storage
    │                           { storageType: "memory" }
    └─ NO → Continue...
    ↓
Is it user-specific?
    ├─ YES (profile, preferences) → Use sessionStorage
    │                               { storageType: "sessionStorage" }
    └─ NO → Use localStorage (default)
    ↓
How often does data change?
    ├─ Rarely (categories, settings) → TTL: 1 hour
    ├─ Sometimes (projects) → TTL: 15 minutes
    ├─ Often (search) → TTL: 5-10 minutes
    └─ Very often (real-time) → TTL: 30-60 seconds
    ↓
Is this a mutation (POST/PUT/DELETE)?
    ├─ YES → ttl: 0 (don't cache)
    │        Invalidate related caches after
    └─ NO → Cache it!
    ↓
Use fetchWithCache(url, {}, { ttl, storageType })
```

---

## 🔌 Integration Points

### In Components

```
Component
    ↓
useFetchWithCache(url)
    ↓
├─ data → Render
├─ loading → Show skeleton
├─ error → Show error
├─ cached → Show cache indicator
├─ refetch → Manual refresh button
└─ invalidate → After mutations
```

### In Utility Files

```
API Function (e.g., getProjects())
    ↓
fetchWithCache(url)
    ↓
├─ Check cache
├─ Fetch if needed
└─ Return data
```

---

## ⚙️ Configuration Levels

```
Global Defaults
    ↓
DEFAULT_TTL = 5 * 60 * 1000
DEFAULT_STORAGE = "localStorage"
    ↓
Per-Call Override
    ↓
fetchWithCache(url, {}, {
  ttl: 10 * 60 * 1000,
  storageType: "sessionStorage",
  forceRefresh: false
})
    ↓
User Preferences (Optional)
    ↓
User setting: "Disable caching"
    ↓
{ forceRefresh: true }
```

---

## 🚦 Cache Lifecycle

```
CREATE
  ↓
setCacheData(key, data, ttl)
  ↓
Entry created with:
├─ data: Your API response
├─ timestamp: Date.now()
└─ ttl: Time before expiry
  ↓
RETRIEVE
  ↓
getCacheData(key)
  ↓
Check: (now - timestamp) < ttl
  ├─ YES ✅ → Return data
  └─ NO ❌ → Return null
  ↓
INVALIDATE (Manual)
  ↓
invalidateCache(key)
  ↓
Entry removed immediately
  ↓
DELETE (Automatic)
  ↓
Expired entries removed on:
├─ Next access attempt
├─ Browser refresh
└─ Manual clearAllCache()
```

---

## 🔐 Security Boundaries

```
Browser Storage Security

┌─────────────────────────────────────────┐
│         Domain A (yoursite.com)         │
│                                         │
│  localStorage (all scripts can access) │
│  sessionStorage (all scripts can access)|
│  Memory (only your app)                 │
│                                         │
│  ⚠️  XSS Vulnerability = Data exposed  │
│      → Don't store sensitive data       │
└─────────────────────────────────────────┘

Best Practices:
├─ ✅ Cache: Projects, categories, public data
├─ ⚠️  Maybe: User profiles (non-sensitive fields)
└─ ❌ Never: Tokens, passwords, payments
```

---

## 📈 Performance Comparison

### Before Caching

```
User visits project list
    ↓
[████████████████] 2000ms - Fetch API
    ↓
[████████████████] 2000ms - Parse JSON
    ↓
[████] 200ms - Render component
    ↓
Total: ~2200ms ⏱️

User goes back and revisits
    ↓
[████████████████] 2000ms - Fetch API AGAIN ❌
    ↓
Total: ~2200ms (same!)
```

### With Caching

```
User visits project list (first time)
    ↓
[████████████████] 2000ms - Fetch API
    ↓
[████] 200ms - Render component
    ↓
💾 Cache stored for 15 minutes
    ↓
Total: ~2200ms ⏱️

User goes back and revisits (within 15 min)
    ↓
[█] 50ms - Get from cache ✨
    ↓
[████] 200ms - Render component
    ↓
Total: ~250ms (9x faster!) 🚀
```

---

## 🎯 Use Case Matrix

```
┌────────────────┬─────────────┬────────┬──────────┐
│ Data Type      │ TTL         │ Storage│ Mutate   │
├────────────────┼─────────────┼────────┼──────────┤
│ Categories     │ 1 hour      │ Local  │ Rare     │
│ User Profile   │ 30 min      │ Session│ Moderate │
│ Projects List  │ 15 min      │ Local  │ Frequent │
│ Project Detail │ 10 min      │ Local  │ Frequent │
│ Search Results │ 10 min      │ Local  │ Every    │
│ Comments       │ 5 min       │ Session│ Very     │
│ Real-time Data │ 30-60 sec   │ Session│ Constant │
│ Auth Token     │ 0 (never!)  │ Memory │ Once     │
│ Passwords      │ 0 (never!)  │ Memory │ Never    │
└────────────────┴─────────────┴────────┴──────────┘
```

---

## 🔄 Mutation Flow

```
User submits form
    ↓
handleSubmit()
    ↓
await createProject(data)  // POST request
    ↓
✅ Success
    ↓
Invalidate caches:
├─ invalidateCacheForUrl("/api/projects")
├─ invalidateCacheForUrl("/api/projects/overview")
└─ invalidateCacheForUrl("/api/search")
    ↓
Caches removed from storage
    ↓
Next API call fetches fresh data
    ↓
User sees updated content
```

---

## 💾 Storage Comparison

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│              │ localStorage │sessionStorage│    Memory    │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Persistence  │ Until clear  │ Tab closes   │ Browser      │
│ Scope        │ Domain-wide  │ Tab-wide     │ Instance     │
│ Size limit   │ 5-10MB       │ 5-10MB       │ RAM limited  │
│ Access speed │ Fast         │ Fast         │ Fastest      │
│ Security     │ ⚠️ JS access │ ⚠️ JS access │ ✅ JS only   │
│ Use case     │ App-wide     │ User session │ Sensitive    │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Best for     │ Projects,    │ Profile,     │ Tokens,      │
│              │ categories   │ settings     │ passwords    │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

---

## 🧪 Testing Scenarios

### Scenario 1: Cache Hit

```
1. Call fetchWithCache("/api/data")
   └─ Gets from API, caches
   └─ cached = false

2. Call again immediately
   └─ Gets from cache
   └─ cached = true ✅
```

### Scenario 2: Cache Expiration

```
1. Cache created with ttl = 1000ms
2. Wait 500ms: Still valid ✅
3. Wait 600ms: Expired ❌
4. Next call: Fetches fresh
```

### Scenario 3: Offline Fallback

```
1. Data cached from previous visit
2. Network goes down
3. Fetch attempt fails
4. Stale cache returned with error message ⚠️
5. User gets data but sees: "Using cached data"
```

### Scenario 4: Force Refresh

```
1. fetchWithCache(url, {}, { forceRefresh: true })
2. Cache ignored
3. Always fetches fresh
4. cached = false
```

---

## 🎨 Component Integration Pattern

```
Component
    ↓
useFetchWithCache(url)
    ↓
Render states:
│
├─ loading && !data
│  └─ <Skeleton />
│
├─ error && !data
│  └─ <Error message={error} retry={refetch} />
│
├─ data && cached
│  └─ <Content data={data} indicator="📦 Cached" />
│
├─ data && !cached
│  └─ <Content data={data} indicator="🌐 Fresh" />
│
└─ <RefreshButton onClick={refetch} />
```

---

## 🚨 Common Mistakes → Solutions

```
❌ MISTAKE #1: Cache sensitive data
✅ SOLUTION: Use memory storage for auth
   { storageType: "memory" }

❌ MISTAKE #2: Never invalidate after mutations
✅ SOLUTION: Always invalidate affected caches
   invalidateCacheForUrl("/api/items")

❌ MISTAKE #3: Cache POST requests
✅ SOLUTION: Set ttl: 0 for mutations
   fetchWithCachePOST(url, body) // ttl: 0 by default

❌ MISTAKE #4: TTL too long for dynamic data
✅ SOLUTION: Match TTL to data freshness
   Dynamic: 5-15 minutes
   Static: 1 hour

❌ MISTAKE #5: Forget SSR check
✅ SOLUTION: We handle it! All operations check window
```

---

## 🎯 Implementation Checklist

```
Setup Phase:
□ Review CACHING_QUICK_REFERENCE.md
□ Look at CACHING_EXAMPLES.ts
□ Understand your data freshness needs

Implementation Phase:
□ Replace fetch() with fetchWithCache()
□ Add useFetchWithCache() to components
□ Set appropriate TTL per endpoint
□ Invalidate after mutations

Testing Phase:
□ Open DevTools → Application → Local Storage
□ Check "cache:" entries exist
□ Verify Network tab shows fewer API calls
□ Test cache hit by revisiting page
□ Test expiration by waiting for TTL

Optimization Phase:
□ Monitor performance improvements
□ Adjust TTL based on real usage
□ Clear cache on logout
□ Consider cache cleanup strategy
```

---

## 🌟 Key Takeaways

1. **Cache is automatic** - Just use fetchWithCache()
2. **Expiration is automatic** - TTL handles cleanup
3. **Fallback is smart** - Uses stale cache on error
4. **Safe for SSR** - No server errors
5. **Type safe** - Full TypeScript support
6. **Simple API** - Easy to learn and use
7. **Powerful options** - Customize when needed

---

**Master this in 15 minutes, save hours with fewer API calls!** ⚡

Last Updated: January 13, 2026
