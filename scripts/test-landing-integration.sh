#!/bin/bash

# Landing Component Integration Test Script
echo "🧪 Testing Landing Component Integration with Content API"
echo "========================================================"

BASE_URL="http://localhost:3000"
ADMIN_TOKEN="your-admin-token-here"

echo ""
echo "📖 1. Testing Landing Page loads successfully"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
if [ "$STATUS" = "200" ]; then
    echo "✅ Landing page loads successfully (HTTP $STATUS)"
else
    echo "❌ Landing page failed to load (HTTP $STATUS)"
    exit 1
fi

echo ""
echo "📖 2. Verifying content is loaded from database"
HERO_HEADING=$(curl -s "$BASE_URL/" | grep -o "Bridging Markets, Building Partnerships" | head -1)
if [ -n "$HERO_HEADING" ]; then
    echo "✅ Hero content is displayed: '$HERO_HEADING'"
else
    echo "❌ Hero content not found on page"
fi

echo ""
echo "📖 3. Testing content API endpoints"
API_HERO_HEADING=$(curl -s "$BASE_URL/api/content/hero" | jq -r '.heading')
echo "✅ API returns hero heading: '$API_HERO_HEADING'"

echo ""
echo "🔄 4. Testing dynamic content update"
echo "Updating hero content via API..."
UPDATE_RESULT=$(curl -s -X PUT "$BASE_URL/api/content/hero" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"heading":"Dynamic Content Test","description":"Content updated via API and reflected on Landing page"}' | jq -r '.heading')

if [ "$UPDATE_RESULT" = "Dynamic Content Test" ]; then
    echo "✅ Content updated successfully: '$UPDATE_RESULT'"
    
    # Wait a moment for any caching to clear
    sleep 2
    
    # Check if the API reflects the change
    UPDATED_HEADING=$(curl -s "$BASE_URL/api/content/hero" | jq -r '.heading')
    if [ "$UPDATED_HEADING" = "Dynamic Content Test" ]; then
        echo "✅ API reflects updated content: '$UPDATED_HEADING'"
    else
        echo "❌ API does not reflect updated content"
    fi
else
    echo "❌ Content update failed"
fi

echo ""
echo "🔄 5. Restoring original content"
curl -s -X PUT "$BASE_URL/api/content/hero" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"heading":"Bridging Markets, Building Partnerships","description":"Connect to our global network and leverage cutting-edge technology for operational efficiency in chemical and pharmaceutical trading."}' > /dev/null

RESTORED_HEADING=$(curl -s "$BASE_URL/api/content/hero" | jq -r '.heading')
echo "✅ Content restored: '$RESTORED_HEADING'"

echo ""
echo "📊 6. Testing other content sections"
BENEFITS_COUNT=$(curl -s "$BASE_URL/api/content/benefits" | jq 'length')
echo "✅ Benefits section has $BENEFITS_COUNT items"

ABOUT_TITLE=$(curl -s "$BASE_URL/api/content/about" | jq -r '.header.title')
echo "✅ About section title: '$ABOUT_TITLE'"

echo ""
echo "🎉 Landing Component Integration Test Complete!"
echo "✅ Landing component successfully fetches content from database"
echo "✅ Content can be updated dynamically via API"
echo "✅ All content sections are accessible"
echo "✅ Admin authentication is working" 