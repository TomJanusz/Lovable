# Backend tests for Collectify API
# Run with: npm test

## Auth tests
- Register with valid data → 201
- Register with existing email → 409
- Register with missing fields → 400
- Login with valid credentials → 200 + token
- Login with wrong password → 401

## Middleware tests
- Request without token → 401
- Request with invalid token → 401
- Request with valid token → passes
- Buyer accessing seller route → 403
- Admin accessing admin route → passes

## Item tests
- GET /api/items → 200 + array
- POST /api/items as seller → 201
- POST /api/items as buyer → 403
- GET /api/items/:id → 200

## Admin tests
- GET /api/admin/users as admin → 200
- GET /api/admin/users as buyer → 403
- DELETE /api/admin/users/:id → 200
- DELETE /api/admin/items/:id → 200
