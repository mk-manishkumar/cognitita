# Backend Fundamentals and Request Flow

Here are comprehensive notes from the video, capturing the core concepts, technical nuances, and practical examples discussed:

### 1. What is a Backend?

* **Traditional Definition:** A backend is a computer that continuously listens for requests (such as HTTP, WebSocket, or gRPC) through open internet ports (like Port 80 or 443) [[00:00](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=0)].
* **Core Function:** It acts as a "server" because it serves content to clients (like static HTML, CSS, JavaScript, or JSON data) and accepts data uploaded by those clients.

### 2. The Complete Request Flow (Behind the Scenes)

The video traces exactly what physically happens when a browser makes a request to a server (using an AWS EC2 instance as an example):

* **DNS (Domain Name System):** The request starts at the browser and hits a DNS server. The DNS uses **A Records** to map the domain (or subdomain) to the specific IP address of the server (e.g., an AWS EC2 instance) [[01:45](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=105)].
* **Firewalls (Security Groups):** Before the request can even touch the operating system, it hits a cloud firewall. For the server to receive the request, the firewall must explicitly allow traffic through specific ports (e.g., Port 80 for HTTP, Port 443 for HTTPS, and Port 22 for secure terminal access) [[03:12](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=192)].
* **Reverse Proxy (Nginx):** Once inside the server, the request is intercepted by a reverse proxy. This is a server that sits in front of other processes to centrally manage rules. For example, Nginx handles SSL certification (via Certbot), forces HTTP traffic to redirect to HTTPS, and routes requests matching a specific subdomain to a local internal port (e.g., `localhost:3001`) [[04:22](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=262)].
* **Application Server (Node.js):** The final hop. A process manager (like PM2) keeps a Node.js server running on that internal port. This server receives the routed request, processes the logic, and returns the response back down the chain to the client [[05:50](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=350)].

### 3. Why Do We Need a Backend?

* **The "Instagram Like" Example:** When you like a photo, the app sends a request to the backend. The server identifies you, saves the action to a database, finds the target user's ID, and triggers a notification to their phone [[07:32](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=452)].
* **Centralized Truth:** A backend must exist because it needs to hold centralized information about *all* users, states, and data to deliver a customized experience to individuals.
* **The Single Word Summary:** If you strip backend engineering down to a single word, it is **Data**—the centralized need to fetch, receive, persist, and manipulate data securely [[09:17](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=557)].

### 4. Why Can't We Put Backend Logic on the Frontend?

To understand this, you must understand the difference in how the code is executed: **Backend code executes on the server's hardware, but frontend code is merely downloaded from the server and executed locally by the client's browser** [[12:46](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=766)].

Because the frontend runs locally on the user's device, it faces four major technical limitations:

* **Security & Sandboxing:** Browsers operate in strictly isolated sandbox environments. Frontend code cannot access the user's underlying operating system, local file systems, or environment variables. If browsers didn't enforce this isolation, visiting a malicious website could allow remote code to quietly steal all the files off your hard drive [[13:30](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=810)].
* **CORS Restrictions:** Browsers enforce Cross-Origin Resource Sharing (CORS) security policies, meaning frontend JavaScript is restricted from making API calls to domains other than its own (unless explicitly permitted by headers). Backend servers have no such restrictions and can pull data from any external API across the internet [[14:10](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=850)].
* **Database Connections:** Server runtimes have native database drivers (like `pg` for PostgreSQL) designed to handle binary data and maintain persistent socket connections. Crucially, backends use **Connection Pooling**—maintaining a static list of open connections to the database to reuse them efficiently. Browsers cannot maintain persistent database connections; if thousands of clients connected to a database directly, the database server would crash instantly from being overwhelmed [[16:33](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=993)].
* **Computing Power:** Frontend code relies on the client's hardware, which varies wildly (from old smartphones with minimal RAM to modern desktops). Heavy business logic on the frontend would cause apps to freeze or crash on weaker devices. Backends solve this because server hardware (CPU and RAM) can be seamlessly scaled up to handle heavy computational loads [[17:48](https://www.youtube.com/watch?v=6Ss4dJD9Kzg&t=1068)].

