import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 users
    { duration: '1m', target: 50 },    // Stay at 50 users for 1 minute
    { duration: '30s', target: 100 },  // Ramp up to 100 users
    { duration: '2m', target: 100 },   // Stay at 100 users for 2 minutes
    { duration: '30s', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete within 2s
    errors: ['rate<0.1'],              // Error rate must be less than 10%
  },
};

const BASE_URL = 'http://localhost:4000';

// Test data
const testUsers = [
  { email: 'loadtest1@example.com' },
  { email: 'loadtest2@example.com' },
  { email: 'loadtest3@example.com' },
];

const testAuctions = [
  'auction-1',
  'auction-2', 
  'auction-3',
];

export default function () {
  // AI-CHAT: Load test simulates realistic auction platform usage
  // Tests concurrent bidding scenarios and system performance under load
  
  const user = testUsers[Math.floor(Math.random() * testUsers.length)];
  
  // Test scenario 1: Browse items (most common action)
  if (Math.random() < 0.6) {
    browsItemsScenario();
  }
  
  // Test scenario 2: Place bids (high impact action)  
  else if (Math.random() < 0.8) {
    bidScenario(user);
  }
  
  // Test scenario 3: Admin actions (low frequency, high impact)
  else {
    adminScenario();
  }
  
  sleep(1);
}

function browsItemsScenario() {
  // Browse items - simulates typical user browsing behavior
  
  const responses = http.batch({
    'get_items': ['GET', `${BASE_URL}/v1/items`],
    'get_categories': ['GET', `${BASE_URL}/v1/categories`],
  });
  
  check(responses['get_items'], {
    'browse items status is 200': (r) => r.status === 200,
    'browse items response time < 500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);
  
  // Simulate viewing specific item details
  const itemResponse = http.get(`${BASE_URL}/v1/items/650e8400-e29b-41d4-a716-446655440001`);
  
  check(itemResponse, {
    'item details status is 200': (r) => r.status === 200,
    'item details response time < 300ms': (r) => r.timings.duration < 300,
  }) || errorRate.add(1);
  
  // Simulate auction details view
  const auctionId = testAuctions[Math.floor(Math.random() * testAuctions.length)];
  const auctionResponse = http.get(`${BASE_URL}/v1/auctions/${auctionId}`);
  
  check(auctionResponse, {
    'auction details status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);
}

function bidScenario(user) {
  // Bidding scenario - tests high-concurrency bidding
  // AI-CHAT: This is the most critical load test for auction platforms
  // Validates system can handle rapid-fire bidding without race conditions
  
  // Login first
  const loginResponse = http.post(`${BASE_URL}/v1/auth/session`, JSON.stringify({
    email: user.email
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(loginResponse, {
    'login status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);
  
  if (loginResponse.status !== 200) return;
  
  const authToken = JSON.parse(loginResponse.body).session_token;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };
  
  // Get current auction state
  const auctionId = testAuctions[Math.floor(Math.random() * testAuctions.length)];
  const auctionResponse = http.get(`${BASE_URL}/v1/auctions/${auctionId}`);
  
  if (auctionResponse.status === 200) {
    const auction = JSON.parse(auctionResponse.body).auction;
    const currentBid = auction.current_bid || auction.reserve_price;
    const minIncrement = auction.min_increment || 5;
    const newBidAmount = currentBid + minIncrement + Math.floor(Math.random() * 20);
    
    // Place bid
    const bidResponse = http.post(
      `${BASE_URL}/v1/auctions/${auctionId}/bids`,
      JSON.stringify({
        user_id: 'load-test-user',
        amount: newBidAmount
      }),
      { headers }
    );
    
    check(bidResponse, {
      'bid placement status is 200': (r) => r.status === 200,
      'bid placement response time < 1s': (r) => r.timings.duration < 1000,
    }) || errorRate.add(1);
    
    // Simulate checking bid history
    const bidHistoryResponse = http.get(`${BASE_URL}/v1/auctions/${auctionId}/bids`);
    
    check(bidHistoryResponse, {
      'bid history status is 200': (r) => r.status === 200,
    }) || errorRate.add(1);
  }
}

function adminScenario() {
  // Admin actions - lower frequency but important for platform management
  
  const adminHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer admin-token',
  };
  
  // Check reports
  const reportsResponse = http.batch({
    'revenue_report': ['GET', `${BASE_URL}/v1/reports/revenue?start_date=2024-01-01&end_date=2024-12-31`, null, { headers: adminHeaders }],
    'impact_report': ['GET', `${BASE_URL}/v1/reports/impact?start_date=2024-01-01&end_date=2024-12-31`, null, { headers: adminHeaders }],
  });
  
  check(reportsResponse['revenue_report'], {
    'revenue report status is 200': (r) => r.status === 200,
    'revenue report response time < 2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);
  
  // Simulate creating new item (less frequent)
  if (Math.random() < 0.1) { // 10% chance
    const newItemResponse = http.post(`${BASE_URL}/v1/items`, JSON.stringify({
      title: `Load Test Item ${Date.now()}`,
      description: 'Item created during load testing',
      category_id: '750e8400-e29b-41d4-a716-446655440001',
      condition: 'good',
      images: ['loadtest-item.jpg'],
      location: 'Seattle, WA',
      buy_now_price: 100,
      created_by: '550e8400-e29b-41d4-a716-446655440001'
    }), { headers: adminHeaders });
    
    check(newItemResponse, {
      'create item status is 200': (r) => r.status === 200,
    }) || errorRate.add(1);
  }
}

// Spike test configuration for sudden traffic bursts
export function spikTest() {
  return {
    stages: [
      { duration: '10s', target: 5 },    // Normal load
      { duration: '10s', target: 200 },  // Sudden spike
      { duration: '30s', target: 200 },  // Stay at spike
      { duration: '10s', target: 5 },    // Return to normal
    ],
  };
}

// Stress test to find breaking point
export function stressTest() {
  return {
    stages: [
      { duration: '2m', target: 100 },   // Ramp up to normal load
      { duration: '5m', target: 100 },   // Stay at normal load
      { duration: '2m', target: 200 },   // Ramp up to high load
      { duration: '5m', target: 200 },   // Stay at high load
      { duration: '2m', target: 300 },   // Ramp up to very high load
      { duration: '5m', target: 300 },   // Stay at very high load
      { duration: '10m', target: 0 },    // Ramp down
    ],
  };
}