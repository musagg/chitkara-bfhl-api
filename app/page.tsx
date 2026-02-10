export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Chitkara University Qualifier 1 - BFHL API</h1>
      <p>This is a Next.js REST API for the BFHL Challenge.</p>
      
      <h2>Available Endpoints:</h2>
      <ul>
        <li>
          <strong>POST /api/bfhl</strong> - Main operations endpoint
          <ul>
            <li>fibonacci - Generate Fibonacci sequence</li>
            <li>prime - Filter prime numbers</li>
            <li>lcm - Calculate Least Common Multiple</li>
            <li>hcf - Calculate Highest Common Factor</li>
            <li>AI - Ask a question (single-word answer)</li>
          </ul>
        </li>
        <li>
          <strong>GET /api/health</strong> - Health check endpoint
        </li>
      </ul>

      <h2>API Examples:</h2>
      <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
        <h3>Test Health Check:</h3>
        <code>curl https://chitkara-bfhl-dotmezi22-kartik2004sharmas-projects.vercel.app/api/health</code>
        
        <h3 style={{ marginTop: "1rem" }}>Test Fibonacci:</h3>
        <code>curl -X POST https://chitkara-bfhl-dotmezi22-kartik2004sharmas-projects.vercel.app/api/bfhl \<br/>
        -H "Content-Type: application/json" \<br/>
        -d '{"{\"fibonacci\": 10}"}'</code>
        
        <h3 style={{ marginTop: "1rem" }}>Test AI:</h3>
        <code>curl -X POST https://chitkara-bfhl-dotmezi22-kartik2004sharmas-projects.vercel.app/api/bfhl \<br/>
        -H "Content-Type: application/json" \<br/>
        -d '{"{\"AI\": \"What is the capital of France?\"}"}'</code>
      </div>

      <p style={{ marginTop: "2rem" }}>
        <a href="https://github.com/Kartik2004sharma/chitkara-bfhl-api" 
           style={{ color: "#0070f3", textDecoration: "none", fontWeight: "bold" }}>
          📦 View Source Code on GitHub →
        </a>
      </p>
    </main>
  );
}
