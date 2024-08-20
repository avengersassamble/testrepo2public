function processUserInput(input) {
  // Injection vulnerability:
  const query = "SELECT * FROM users WHERE username = '" + input + "'"; // Avoid using string concatenation for queries
  // ... execute query ...

  // XSS vulnerability:
  document.getElementById("output").innerHTML = input; // Sanitize input before rendering

  // CSRF vulnerability:
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/critical-action";
  form.submit(); // Missing CSRF token

  // Information leakage:
  console.error("Error: " + error); // Log sensitive information

  // Cryptographic issues:
  const plaintext = "secret";
  const ciphertext = CryptoJS.AES.encrypt(plaintext, "weak_password").toString(); // Weak encryption key
  // ...

  // Denial of Service (DoS):
  for (let i = 0; i < 1000000; i++) {
    // Intensive computation
  }
}

// Insecure password storage:
const password = "password123"; // Avoid storing passwords in plain text

// Dependency injection vulnerability:
function doSomething(dependency) {
  dependency.dangerousMethod(); // Potential for malicious dependency
}

// SQL injection vulnerability:
function executeQuery(query) {
  // ... execute query without proper sanitization ...
}

// Cross-site scripting (XSS) vulnerability:
function renderOutput(output) {
  // ... render output without proper encoding ...
}
