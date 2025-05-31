#!/bin/bash

# Content API Test Script
echo "🧪 Testing Content API Endpoints"
echo "================================="

BASE_URL="http://localhost:3000"
ADMIN_TOKEN="your-admin-token-here"

echo ""
echo "📖 1. Testing GET /api/content (fetch all content)"
curl -s "$BASE_URL/api/content" | jq '.hero.heading'

echo ""
echo "📖 2. Testing GET /api/content/hero (fetch hero section)"
curl -s "$BASE_URL/api/content/hero" | jq '.heading'

echo ""
echo "📖 3. Testing GET /api/content/benefits (fetch benefits section)"
curl -s "$BASE_URL/api/content/benefits" | jq 'length'

echo ""
echo "🔒 4. Testing unauthorized PUT request"
curl -s -X PUT "$BASE_URL/api/content/hero" \
  -H "Content-Type: application/json" \
  -d '{"heading":"Unauthorized Test"}' | jq '.error'

echo ""
echo "✏️  5. Testing authorized PUT /api/content/hero"
curl -s -X PUT "$BASE_URL/api/content/hero" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"heading":"API Test Success","description":"Content updated via API"}' | jq '.heading'

echo ""
echo "✏️  6. Testing authorized PUT /api/content/benefits"
curl -s -X PUT "$BASE_URL/api/content/benefits" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '[{"title":"API Quality","icon":"Shield","description":"Tested via API"},{"title":"Automation","icon":"Zap","description":"Automated testing"}]' | jq 'length'

echo ""
echo "❌ 7. Testing invalid section"
curl -s "$BASE_URL/api/content/invalid" | jq '.error'

echo ""
echo "✅ Content API tests completed!"
echo "=================================" 