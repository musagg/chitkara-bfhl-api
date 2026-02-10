# chitkara-bfhl-api

API Test Commands

Health check:

curl https://chitkara-bfhl-dotmezi22-kartik2004sharmas-projects.vercel.app/api/health

Test Fibonacci:

curl -X POST https://chitkara-bfhl-dotmezi22-kartik2004sharmas-projects.vercel.app/api/bfhl \
-H "Content-Type: application/json" \
-d '{"fibonacci": 10}'

Test AI:

curl -X POST https://chitkara-bfhl-dotmezi22-kartik2004sharmas-projects.vercel.app/api/bfhl \
-H "Content-Type: application/json" \
-d '{"AI": "What is the capital of France?"}'

Notes:
- Updated by musagg.
