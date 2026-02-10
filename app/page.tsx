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

      <p>
        <a href="https://github.com/yourusername/chitkara-qualifier-bfhl" 
           style={{ color: "#0070f3" }}>
          View Documentation →
        </a>
      </p>
    </main>
  );
}
