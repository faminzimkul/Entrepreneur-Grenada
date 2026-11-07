# Admin panel and PHP API handoff

The frontend admin panel is available at `/admin`. It is intentionally API-driven: no database is connected and no demo credentials are included.

## Frontend environment

Copy `.env.example` to `.env.local` for local development. After the PHP API is uploaded to InfinityFree, set:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

Set the same variable in Vercel → Project → Settings → Environment Variables, then redeploy. Do not put database passwords, PHP secrets, or admin passwords in any `VITE_*` variable; Vite exposes those values to browsers.

## PHP API contract

All responses must be JSON and use UTF-8. Configure CORS to allow the exact frontend domain and handle the OPTIONS preflight request. Use HTTPS.

- `POST /api/admin/login` — body: `{"email":"...","password":"..."}`; response: `{"token":"opaque-random-token","user":{"email":"..."}}`.
- `GET /api/admin/me` — authenticated; response: `{"user":{"email":"..."}}`.
- `POST /api/admin/logout` — authenticated; response: `{"message":"Logged out"}`.
- `GET /api/admin/articles` — authenticated; response: `{"articles":[...all drafts and published posts...]}`.
- `POST /api/admin/articles` — authenticated; create a post; response: `{"article":{...}}`.
- `PUT /api/admin/articles/{id}` — authenticated; update a post; response: `{"article":{...}}`.
- `DELETE /api/admin/articles/{id}` — authenticated; permanently delete; response: `{"message":"Deleted"}`.
- `GET /api/articles` — public; return published posts only: `{"articles":[...]}`.

For protected routes the frontend sends `Authorization: Bearer <token>`. The PHP API must validate the token on every protected request, expire tokens, hash admin passwords with PHP `password_hash()`, and never trust a role or user ID sent by the browser.

## Article JSON shape

```json
{
  "id": "stable-url-slug",
  "title": "Article headline",
  "subtitle": "Short summary",
  "category": "BUILDING A BUSINESS",
  "navGroup": "Build Your Business",
  "author": "Author name",
  "authorRole": "Contributor",
  "publishedAt": "November 8, 2026",
  "readTime": "5 min read",
  "placement": "latest",
  "pullQuote": "A highlighted quote",
  "keyTakeaways": ["First takeaway", "Second takeaway"],
  "body": ["First paragraph", "Second paragraph"],
  "coverImage": "https://example.com/cover.webp",
  "status": "draft"
}
```

Allowed `category`: `BUILDING A BUSINESS`, `BUSINESS NEWS`, `START A SIDE HUSTLE`, `FRANCHISES`.
Allowed `navGroup`: `Build Your Business`, `Start a Side Hustle`, `Franchises`, `Business News`.
Allowed `placement`: `featured`, `latest`, `side`, `archive`. Allowed `status`: `draft`, `published`.

The public website uses `GET /api/articles`; the PHP API should omit drafts from that response. Admin editing supports a cover image URL (image upload/storage is not implemented yet).

## Current limitation

The dashboard UI and frontend API client are committed, but login, saving, publishing, deleting, and live public article loading cannot work until the PHP API is implemented and deployed. Database tables and credentials are deliberately not created in this phase.
