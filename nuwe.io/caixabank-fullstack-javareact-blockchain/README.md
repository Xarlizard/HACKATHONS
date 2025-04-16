Submission completed by [xarlizard](https://github.com/xarlizard)

# 🏦 CaixaBank React-Java FullStack Challenge ☕️

**Category:** Software  

**Subcategory:** Java Backend & React Frontend

**Difficulty:** Medium

---

## 🌐 Background

In this challenge you will build a Java backend application that simulates a simplified blockchain and cryptocurrency trading platform. The app includes user authentication, wallet management, transaction processing, live market data fetching, and a blockchain simulation mechanism. You are provided with a basic project structure (with a `pom.xml` and folder layout) and must implement the required classes and functionalities as described in the tasks.

For additional information on the proposed functioning of our blockchain, please read the pdf file: [Blockchain Guide](./BlockchainAppInfo-FullStack.pdf).

API Endpoint: https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-3d8ede30-848f-4a7a-acc2-22ba0cd9a382/default/fake-market-prices

## 📂 Repository Structure

### Backend

```bash
Backend/
└── blockchain
    ├── cookies.txt
    ├── docker-compose.yml
    ├── Dockerfile
    ├── mvnw
    ├── mvnw.cmd
    ├── pom.xml
    └── src
        ├── main
        │   ├── java
        │   │   └── com
        │   │       └── hackathon
        │   │           └── blockchain
        │   │               ├── BlockchainApplication.java
        │   │               ├── config
        │   │               │   ├── CorsConfig.java
        │   │               │   ├── SecurityConfig.java
        │   │               │   └── StartupRunner.java
        │   │               ├── controller
        │   │               │   ├── AuthController.java
        │   │               │   ├── BlockchainController.java
        │   │               │   ├── DashboardController.java
        │   │               │   ├── MarketDataController.java
        │   │               │   └── WalletController.java
        │   │               ├── dto
        │   │               │   ├── LoginRequest.java
        │   │               │   ├── RegisterRequest.java
        │   │               │   ├── TradeRequest.java
        │   │               │   └── TransactionDTO.java
        │   │               ├── model
        │   │               │   ├── Asset.java
        │   │               │   ├── Block.java
        │   │               │   ├── Transaction.java
        │   │               │   ├── User.java
        │   │               │   └── Wallet.java
        │   │               ├── repository
        │   │               │   ├── BlockRepository.java
        │   │               │   ├── TransactionRepository.java
        │   │               │   ├── UserRepository.java
        │   │               │   └── WalletRepository.java
        │   │               ├── service
        │   │               │   ├── BlockchainService.java
        │   │               │   ├── MarketDataService.java
        │   │               │   ├── UserService.java
        │   │               │   └── WalletService.java
        │   │               └── utils
        │   │                   └── HashUtil.java
        │   └── resources
        │       └── application.properties
        └── test
            └── java
                └── com
                    └── hackathon
                        └── blockchain
                            └── BlockchainApplicationTests.java
```

---

### Frontend

```bash
Frontend/
├── public/
│   ├── caixabank-icon.png
│   ├── caixabank-tech-logo.png
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   ├── components/
│   │   ├── AssetTradingPanel.js
│   │   ├── AuthView.js
│   │   ├── BlockchainExplorer.js
│   │   ├── BuyUSDT.js
│   │   ├── ChartSection.js
│   │   ├── CreateWalletButton.js
│   │   ├── DashboardView.js
│   │   ├── LoadingSpinner.js
│   │   ├── MarketChart.js
│   │   ├── Navbar.js
│   │   ├── TradingPairs.js
│   │   ├── TradingView.js
│   │   ├── TransactionsTable.js
│   │   └── WalletOverview.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── MarketContext.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useMarket.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── blockchainService.js
│   │   ├── marketService.js
│   │   └── walletService.js
│   └── utils/
│       ├── fetchData.js
│       ├── filterTransactions.js 
│       └── getChartColor.js 
├── babel.config.js
├── jest.config.js
├── package.json
└── package-lock.json
```

## 🎯 Tasks

This challenge will consist of two distinct parts: **Backend** and **Frontend**.

**⚠️ For a better development and correction, we strongly recommend to develop first the whole proposed Backend and then the Frontend ⚠️**

### Backend

1. **Task 1**: Dockerfile & Health Check
2. **Task 2**: User login, register and session management
3. **Task 3**: Wallet & Live data fetching 
4. **Task 4**: Transactions
5. **Task 5**: Blockchain simulation

### Frontend

1. **Task 1**: User authentication
2. **Task 2**: Wallet Management, Market Prices & Blockchain Explorer
3. **Task 3**: Trading

The frontend will use **React Hooks, Context API, and a reusable fetch utility** to manage state and interact with the backend.

**Please read the entire readme and code carefully. It is very important to understand correctly the functioning of the app you are requested to develop.**

## 📑 Detailed information about tasks

### Backend

#### Task 1: Dockerfile & HealthCheck

The first thing to do is to configure the Dockerfile to be able to test the application in containers.

A health check endpoint is provided to which a first request will be sent to check that the container is working properly.

Before doing the first push, you should make sure that this file works correctly, as all other tasks will be tested by attacking the endpoint generated by this container on port 3000.

---

#### Task 2: User login, register and session management

- **Objective:**  
  This task consists of creating the authentication circuit: registration, login to obtain the login cookie and logout. 

- **Flow:**
  - **Register:**  
    - **Endpoint:** `POST /auth/register`  
    - **Request Body:**
      ```json
      {
        "email": "user@example.com",
        "username": "user123",
        "password": "securePassword"
      }
      ```
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "User registered and logged in successfully"}
        ```
      - **Flow Details:**  
        After registration, the user is automatically authenticated and a session is created. If authentication fails after registration, return a HTTP 500 with an error message.

  - **Login:**  
    - **Endpoint:** `POST /auth/login`  
    - **Request Body:**
      ```json
      {
        "username": "user123",
        "password": "securePassword"
      }
      ```
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "Login successful"}
        ```
      - **HTTP 401 (Invalid credentials):**  
        ```json
        {"message": "❌ Invalid credentials"}
        ```

  - **Session Check:**  
    - **Endpoint:** `GET /auth/check-session`  
    - **Expected Response:**  
      - **HTTP 200 (Active Session):**  
        ```json
        {"user": {"username": "user123"}}
        ```
      - **HTTP 401 (No active session):**  
        ```json
        {"message": "❌ No active session"}
        ```

  - **Logout:**  
    - **Endpoint:** `POST /auth/logout`  
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "Logged out successfully"}
        ```

---

#### Task 3: Wallet & Live data fetching 

- **Objective:**  
  Implement wallet creation, asset buying/selling, and live market price fetching. By default, all user wallets starts with 100.000$.

- **Flow:**
  - **Create Wallet:**  
    - **Endpoint:** `POST /wallet/create`  
    - **Requirements:** Must be an authenticated request.
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "✅ Wallet successfully created! Address: <wallet_address>"}
        ```
      - **HTTP 401 (Not authenticated):**  
        ```json
        {"message": "❌ You must be authenticated to create a wallet."}
        ```
      - **Additional Information**:
        - All wallets manually created must start with 100000$ (fiat).

  - **Fetch Live Market Prices:**  
    - **Endpoint:** `GET /market/prices`  
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {
          "BTC": 35000.0,
          "ETH": 2500.0,
          "USDT": 1.0,
          "NCOIN": 10,
          "CCOIN": 10
        }
        ```

  - **Fetch Price for Specific Asset:**  
    - **Endpoint:** `GET /market/price/{symbol}` (e.g., `/market/price/BTC`)
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "Current price of BTC: $35000.0"}
        ```
      - **HTTP 400 (Asset not found or unavailable):**  
        ```json
        {"message": "❌ Asset not found or price unavailable: BTC"}
        ```

---

#### Task 4: Transactions

- **Objective:**  
  Implement buying and selling of assets along with maintaining transaction history.

- **Flow:**
  - **Buy Asset:**  
    - **Endpoint:** `POST /wallet/buy`  
    - **Requirements:** Authenticated user.
    - **Request Body Example:**
      ```json
      {
        "symbol": "BTC",
        "quantity": 0.5
      }
      ```
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "✅ Asset purchased successfully!"}
        ```
      - **Error Cases:**  
        - Wallet not found:
          ```json
          {"message": "❌ Wallet not found!"}
          ```
        - Insufficient funds or USDT balance (if buying non-USDT asset):
          ```json
          {"message": "❌ Insufficient USDT balance! You must buy USDT first."}
          ```
      - **Behaviour**:
        - **Order Submission:** The user submits a buy order by specifying the asset symbol and the desired quantity.
        - **Cost Calculation:** The system multiplies the quantity by the current market price to determine the total cost.
        - **Fund Verification:** It checks that the user's wallet contains sufficient fiat funds or required base tokens (like USDT) to cover the purchase.
        - **Wallet Updates:** If sufficient funds are available, the fiat balance is reduced by the total cost, and the corresponding asset amount is added to the wallet.
        - **Transaction Recording:** A record of the purchase is created with details such as asset symbol, quantity, price, timestamp, and a status marked as **pending**.
        - **Liquidity pools**: The liquidity pools should be updated according to the transaction. If 100 USDT are purchased, those assets move from LP-USDT to the purchasing wallet.

  - **Sell Asset:**  
    - **Endpoint:** `POST /wallet/sell`  
    - **Requirements:** Authenticated user.
    - **Request Body Example:**
      ```json
      {
        "symbol": "BTC",
        "quantity": 0.5
      }
      ```
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "✅ Asset sold successfully!"}
        ```
      - **Error Cases:**  
        - Wallet not found:
          ```json
          {"message": "❌ Wallet not found!"}
          ```
        - Not enough assets:
          ```json
          {"message": "❌ Not enough assets to sell!"}
          ```
      - **Behaviour**:
        - **Order Submission:** The user submits a sell order specifying the asset and quantity to be sold.
        - **Asset Verification:** The system verifies that the wallet contains enough of the asset to complete the sale. The sale is always made for USDT. Afterwards, USDT can be exchanged back to Fiat if desired.
        - **Revenue Calculation:** The revenue is calculated using the live market price.
        - **Wallet Updates:** The asset amount is deducted from the wallet, and the corresponding revenue is credited (either as fiat or as a base token).
        - **Transaction Recording:** A transaction record is created for the sale, also marked as pending initially. (Same as buy asset)
        - **Liquidity pools**: The liquidity pools should be updated according to the transaction. If 100 USDT are sold, those assets move from the user wallet to LP-USDT.

  - **Wallet Balance:**  
    - **Endpoint:** `GET /wallet/balance`  
    - **Requirements:** Authenticated user.
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {
          "wallet_address": "some_wallet_address",
          "cash_balance": 10000.0,
          "net_worth": 15000.0,
          "assets": {
            "BTC": 7000.0,
            "ETH": 3000.0
          }
        }
        ```
      - **HTTP 401 (Not authenticated):**  
        ```json
        {"message": "❌ You must be authenticated"}
        ```
      - **HTTP 404 (Wallet not found):**  
        ```json
        {"message": "❌ Wallet not found"}
        ```

  - **Wallet Transactions:**  
    - **Endpoint:** `GET /wallet/transactions`  
    - **Requirements:** Authenticated user.
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {
          "sent": [
            {
              "id": 1,
              "assetSymbol": "BTC",
              "amount": 0.5,
              "pricePerUnit": 35000.0,
              "type": "BUY",
              "timestamp": "2025-02-18T12:34:56.789Z",
              "status": "MINED",
              "fee": 0.0,
              "senderWalletId": 2,
              "receiverWalletId": 3
            }
          ],
          "received": [
            {
              "id": 2,
              "assetSymbol": "ETH",
              "amount": 2.0,
              "pricePerUnit": 2500.0,
              "type": "SELL",
              "timestamp": "2025-02-18T13:45:00.123Z",
              "status": "MINED",
              "fee": 0.0,
              "senderWalletId": 3,
              "receiverWalletId": 2
            }
          ]
        }
        ```
      - **HTTP 401 (Not authenticated):**  
        ```json
        {"message": "❌ You must be authenticated."}
        ```
      - **HTTP 404 (Wallet not found):**  
        ```json
        {"message": "❌ Wallet not found."}
        ```

---

#### Task 5: Blockchain simulation

- **Objective:**  
  Simulate a blockchain by mining pending transactions into blocks.

- **Flow:**
  - **Mine Block:**  
    - **Endpoint:** `POST /blockchain/mine`  
    - **Expected Response:**  
      - **HTTP 200 (Block mined):**  
        ```json
        {"message": "Block mined: <block_hash>"}
        ```
      - **HTTP 400 (No pending transactions):**  
        ```json
        {"message": "❌ No pending transactions to mine."}
        ```

  - **View Blockchain:**  
    - **Endpoint:** `GET /blockchain`  
    - **Expected Response:**  
      - **HTTP 200:**
        ```json
        [
          {
            "id": 1,
            "blockIndex": 0,
            "timestamp": 1739921419757,
            "previousHash": "0",
            "nonce": 77403,
            "hash": "000054ba7a15300dcc48ccc86d6402f1086717bb0ff828a050892524fff8412a",
            "genesis": true
          },
          {
            "id": 2,
            "blockIndex": 1,
            "timestamp": 1739926453603,
            "previousHash": "000054ba7a15300dcc48ccc86d6402f1086717bb0ff828a050892524fff8412a",
            "nonce": 62319,
            "hash": "0000f393638957ef5d7d835a9fe2e5654da67b9303abbd02ae8e82dc0762f896",
            "genesis": false
          },
          {
            "id": 3,
            "blockIndex": 2,
            "timestamp": 1739926650238,
            "previousHash": "0000f393638957ef5d7d835a9fe2e5654da67b9303abbd02ae8e82dc0762f896",
            "nonce": 596,
            "hash": "00004bc719f169f3a0364172593e276e13a631f94084bc45ae4d95ecbdb83f57",
            "genesis": false
          }
        ]
        ```

  - **Validate Blockchain:**  
    - **Endpoint:** `GET /blockchain/validate`  
    - **Expected Response:**  
      - **HTTP 200:**  
        ```json
        {"message": "Blockchain valid: true"}
        ```
        or if the chain is invalid,  
        ```json
        {"message": "Blockchain valid: false"}
        ```
At the start of the application, a series of processes detailed below must be executed:

- Create wallets for the currencies with the following format: ‘LP-COINNAME’. These wallets do not have an initial balance of fiat money, they only have the related assets.
- As a liquidity pool, they are initially allocated a certain number of assets. BTC: 100000, ETH: 400000, USDT: 1000000, NCOIN: 10000000, CCOIN: 2000000.
- A genesis block will have to be created as the first block in the chain with no associated transactions.

---

### Frontend

⚠ **Warning:**  

Do **not** delete components that contain the `data-testid` prop. These elements are essential for evaluating your solution correctly.  

While you **can and should complete their implementation**, ensuring they display the correct values, **you must not remove them**.

You must fill in the required logic or data but cannot remove the component itself. Doing so may cause your solution to be incorrectly evaluated or fail assessment entirely. 🚨

---

### Task 1: User Authentication

In this task, you need to implement **user authentication**, allowing users to **register, log in, maintain a session, and log out**. The authentication flow includes form validation, API integration, and session management using **React Context API**.

### 🛠️ **Files & Implementation Guide**

### 📌 `/components/AuthView.js`
This is the main authentication component where users can **log in or register**. The UI consists of a **tab system** that lets users switch between login and registration forms.

#### 🔹 What needs to be implemented?
- **Tabs for Login and Register:**
  - Implement a tab system (`Tabs`, `Tab`) that switches between Login and Register forms.
  - Update the **submit button text** dynamically depending on the active tab.
  
- **Form State Management:**
  - Store form data (`username`, `email`, `password`) in `useState`.
  - Handle form validation:
    - **Username** is required.
    - **Email** must be a valid email when registering.
    - **Password** must be at least **6 characters** long.
  
- **Form Submission & API Calls:**
  - On form submission, validate the inputs.
  - Call:
    - `loginUser(formData)` for login.
    - `registerUser(formData)` for registration.
  - Show **loading state** on the submit button.
  - Handle **API errors** by displaying an error message.

- **Redirect after Login/Register:**
  - If authentication succeeds, redirect users to **`/dashboard`**.

### 📌 `/components/Navbar.js`
This component handles the **navigation bar**, displaying the **user’s username** and the **logout option**.

#### 🔹 What needs to be implemented?
- **Display authenticated user’s username**:
  - Retrieve the logged-in user's **username** from `useAuth()`.
  - If authenticated, show the **username** in the navbar.
  - Clicking the username should open a **dropdown menu** (`Menu`) with a logout button.

- **Logout Functionality**:
  - When the user clicks "Logout", call `logoutUser()` from `authService`.
  - Clear the authentication state in `AuthContext`.
  - Redirect the user to the **login page (`/`)**.

### 📌 `/services/authService.js`
This file contains API functions to interact with the authentication backend.

#### 🔹 What needs to be implemented?
- `checkUserSession()`: Sends a `GET /auth/check-session` request to verify if a user is logged in.
- `registerUser(userData)`: Sends a `POST /auth/register` request with **username, email, and password**.
- `loginUser(credentials)`: Sends a `POST /auth/login` request with **username and password**.
- `logoutUser()`: Sends a `POST /auth/logout` request to end the session.

### 📌 `/hooks/useAuth.js`
This is a **custom hook** that provides access to authentication state using `AuthContext`.

#### 🔹 What needs to be implemented?
- Use `useContext(AuthContext)` to return:
  - The **current user** (`user`).
  - The **loading state** (`loading`).
  - Functions for **login and logout**.

### 📌 `/context/AuthContext.js`
This is the **authentication context** that manages the **global authentication state**.

#### 🔹 What needs to be implemented?
- Create `AuthContext` using `createContext()`.
- Implement an `AuthProvider` that:
  - Stores the **user's authentication state** (`user`).
  - Calls `checkUserSession()` on page load to check if the user is logged in.
  - Provides `handleLogin()` and `handleLogout()` functions.
- When `handleLogout()` is called:
  - The user state should be **cleared**.
  - The user should be redirected to the login page.

### 📌 `/utils/fetchData.js`
This utility function **abstracts API requests** and handles errors.

#### 🔹 What needs to be implemented?
- Accepts:
  - `endpoint`: API URL.
  - `method`: HTTP method.
  - `body`: Optional request payload.
- Configures `fetch()` with `credentials: "include"` to **preserve the session**.
- Throws an **error with the API response message** if the request fails.

### ✅ **Final Expected Behavior**
- Users should be able to **register**, **log in**, and **log out**.
- The UI should validate inputs and display **error messages** when needed.
- The **navbar** should show the **logged-in user’s username**.
- Clicking logout should **clear the session** and **redirect to login**.
- API calls should be properly **handled**.

---

### Task 2: Dashboard (Wallet Management, Market Prices & Blockchain Explorer)

In this task, you will implement a **dashboard** that allows users to **view their wallet**, **buy USDT**, **track market prices**, and **explore the blockchain**. The dashboard integrates multiple components to create a complete financial overview.

### 🛠️ **Files & Implementation Guide**

### 📌 `/components/DashboardView.js`
This is the **main dashboard component**, acting as a container for the different sections.

#### 🔹 What needs to be implemented?
- **Wallet Overview**:
  - Fetch wallet data using `getWalletBalance()`.
  - Display **wallet balance**, **net worth**, and **available assets**.
  - If the user **does not have a wallet**, show the **Create Wallet** button.
  
- **Buy USDT**:
  - Should be **disabled until the user creates a wallet**.
  - Calls `buyUSDT(amount)`.
  - Updates the wallet balance when a purchase is completed.

- **Trading Pairs**:
  - Displays **BTC, ETH, CCOIN, and NCOIN prices**.
  - Allows users to navigate to the **trading page** for each asset.

- **Blockchain Explorer**:
  - Fetches blockchain data and displays **mined blocks**.

- **Implementation Details**:
  - Fetch wallet data when the component **mounts** and when transactions occur.
  - If wallet creation is successful, refresh the wallet data.

### 📌 `/components/WalletOverview.js`
This component displays **the user’s wallet details**.

#### 🔹 What needs to be implemented?
- Display the **wallet address**.
- Show **fiat balance** and **net worth**.
- List available **cryptocurrency assets**.
- If the user has **no assets**, show a message indicating this.

### 📌 `/components/CreateWalletButton.js`
This button allows users to create a new wallet.

#### 🔹 What needs to be implemented?
- Call `createWallet()` when the button is clicked.
- If the request succeeds:
  - Update the wallet state in `DashboardView`.
  - Enable the **Buy USDT** option.
- If the request fails:
  - Display an **error message**.

### 📌 `/components/BuyUSDT.js`
This component allows users to **convert fiat balance into USDT**.

#### 🔹 What needs to be implemented?
- A **text input** where the user enters the amount to buy.
- A **buy button** that calls `buyUSDT(amount)`.
- The button should be **disabled** if:
  - The user **does not have a wallet**.
  - The input is empty or invalid.
  - The request is **still processing**.
- After a successful purchase:
  - Update the **wallet balance**.
  - Show the **new USDT balance**.

### 📌 `/components/TradingPairs.js`
This component displays a **list of tradable assets** with their **prices and charts**.

#### 🔹 What needs to be implemented?
- Fetch **market prices** using `useMarket()`.
- Display **BTC, ETH, CCOIN, and NCOIN** trading pairs.
- Show a **price chart** for each asset.
- When an asset is clicked, navigate to `/trade/:symbol`.

### 📌 `/components/MarketChart.js`
This component **renders a price chart** for a given asset.

#### 🔹 What needs to be implemented?
- Store **only the last 10 price points**.
- Fetch **real-time price updates** from `useMarket()`.
- Determine **chart color** using `getChartColor()`.
- Allow customization of:
  - **Grid visibility** (`showGrid` prop).
  - **Axis labels** (`showLabels` prop).
  - **Size** (`width` and `height` props).

### 📌 `/components/BlockchainExplorer.js`
This component displays the **list of mined blocks** in the blockchain.

#### 🔹 What needs to be implemented?
- Fetch blockchain data from `getBlockchain()`.
- Show a **table** with:
  - **Block index**.
  - **Timestamp**.
  - **Previous hash**.
  - **Nonce**.
  - **Hash**.
  - **Genesis block status**.
- Handle **loading states** and **errors**.

### 📌 `/services/walletService.js`
This file handles **wallet-related API requests**, such as fetching balance, creating a wallet, and performing transactions.

#### 🔹 What needs to be implemented?
- `getWalletBalance()`: Sends a `GET /wallet/balance` request to fetch the user's wallet balance, including fiat and cryptocurrency holdings.
- `createWallet()`: Sends a `POST /wallet/create` request to generate a new wallet for the user.
- `buyUSDT(amount)`: Sends a `POST /wallet/buy` request to purchase USDT using the user's fiat balance.
- `buyAsset(symbol, quantity)`: Sends a `POST /wallet/buy` request to buy a cryptocurrency using available USDT.
- `sellAsset(symbol, quantity)`: Sends a `POST /wallet/sell` request to sell a cryptocurrency and receive USDT.

### 📌 `/services/marketService.js`
This file handles **market-related API requests**, such as retrieving cryptocurrency prices.

#### 🔹 What needs to be implemented?
- `getMarketPrices()`: Sends a `GET /market/prices` request to fetch real-time cryptocurrency prices for supported trading pairs.

### 📌 `/services/blockchainService.js`
This file is responsible for **fetching blockchain data**, including blocks and transactions.

#### 🔹 What needs to be implemented?
- `getBlockchain()`: Sends a `GET /blockchain` request to retrieve the current state of the blockchain, including mined blocks and their details.

### 📌 `/hooks/useMarket.js`
A **custom hook** to manage market price updates.

#### 🔹 What needs to be implemented?
- Fetch **real-time prices** and store them in context.
- Automatically update **every 3 seconds**.

### 📌 `/utils/getChartColor.js`
A **utility function** that determines the chart color.

#### 🔹 What needs to be implemented?
- If there is **no previous price**, return `"gray"`.
- If the **new price is higher**, return `"green"`.
- If the **new price is lower**, return `"red"`.

### ✅ **Final Expected Behavior**
- Users can **create a wallet** and **buy USDT**.
- The **trading pairs list** displays **real-time prices** and **charts**.
- The **blockchain explorer** updates when new blocks are added.
- The **chart color** should change depending on whether the price **increases or decreases**, comparing the previous price with the current price.

---

### Task 3: Trading

In this task, you will implement a **trading interface** that allows users to **buy and sell assets**, view **transaction history**, and track **price movements** in real-time.

### 🛠️ **Files & Implementation Guide**

### 📌 `/components/TradingView.js`
This is the **main trading view** for a selected asset.

#### 🔹 What needs to be implemented?
- Retrieve the **asset symbol** from the URL using `useParams()`.
- Fetch **wallet balance** and **transaction history** using:
  - `GET /wallet/balance`
  - `GET /wallet/transactions`
- Display:
  - **ChartSection** to visualize price movement.
  - **AssetTradingPanel** to buy/sell the asset.
  - **TransactionsTable** to show trading history.
- Handle **buying and selling assets**:
  - `POST /wallet/buy` for purchases.
  - `POST /wallet/sell` for sales.
  - `POST /blockchain/mine` **to mine a block after every transaction**, ensuring transactions are recorded on the blockchain.
- Show an error message if **wallet balance retrieval fails**.

### 📌 `/components/ChartSection.js`
This component displays the **price chart**.

#### 🔹 What needs to be implemented?
- Use the **MarketChart** component to render the price chart.
- Show **real-time market price updates**.
- If market data is **still loading**, display a **loading spinner**.

### 📌 `/components/TransactionsTable.js`
This component **displays transaction history**.

#### 🔹 What needs to be implemented?
- Fetch transactions using `getWalletTransactions()`.
- Filter transactions by **selected asset** using `filterTransactions()`.
- Show transaction details:
  - **Type** (`BUY` in green, `SELL` in red).
  - **Asset symbol**.
  - **Amount** and **price per unit**.
  - **Timestamp (formatted)**.
  - **Status** (`PENDING`, `CONFIRMED`).
- Display:
  - A **loading spinner** when transactions are being fetched.
  - An **error message** if transaction retrieval fails.
  - A **"No transactions found"** message if the user has no history.

### 📌 `/components/AssetTradingPanel.js`
This component allows users to **buy and sell the selected asset**.

#### 🔹 What needs to be implemented?
- Display:
  - **Market price** of the selected asset.
  - **User's USDT balance**.
  - **User's balance of the selected asset**.
- Allow users to **buy and sell assets**:
  - Validate the input amount:
    - **Must be a number**.
    - **Must be greater than zero**.
  - **Trigger API requests** for transactions:
    - `POST /wallet/buy`
    - `POST /wallet/sell`
    - `POST /blockchain/mine` after every transaction.
  - **Disable buttons** when:
    - The user **does not have enough balance**.
    - The request is **in progress**.
- Show error messages when transactions **fail**.

### 📌 `/utils/filterTransactions.js`
This function filters **transactions per asset**.

#### 🔹 What needs to be implemented?
- If **no asset is selected**, return **all transactions**.
- Otherwise, return only the transactions **for the selected asset**.
- Ensure correct handling of **sent and received transactions**.

### 📌 `/services/blockchainService.js`
This file contains functions for **blockchain interactions**.

#### 🔹 What needs to be implemented?
- `mineBlock()`: Mines a new block after transactions. (`POST /blockchain/mine`)

### ✅ **Final Expected Behavior**
- Users can **buy and sell assets** seamlessly.
- **Transactions update instantly** and reflect in the **Transactions Table**.
- The **price chart** updates automatically as market data changes.
- Each **successful transaction mines a new block**, adding to the blockchain.
- **Error handling** ensures users receive feedback on failed operations.

---

## 💫 Guides

### 📋 Backend Endpoints Table

| HTTP Method | Endpoint               | Status Codes   | Response Examples                                                                                                                                                            |
|-------------|------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **GET**   | `/auth/check-session`   | 200, 401       | **200:** `{"user": {"username": "user123"}}` <br> **401:** `{"message": "❌ No active session"}`                                                                              |
| **POST**  | `/auth/register`        | 200, 500       | **200:** `{"message": "User registered and logged in successfully"}` <br> **500:** `{"message": "❌ User registered but authentication failed"}`                           |
| **POST**  | `/auth/login`           | 200, 401       | **200:** `{"message": "Login successful"}` <br> **401:** `{"message": "❌ Invalid credentials"}`                                                                              |
| **POST**  | `/auth/logout`          | 200            | **200:** `{"message": "Logged out successfully"}`                                                                                                                            |
| **POST**  | `/wallet/create`        | 200, 401       | **200:** `{"message": "✅ Wallet successfully created! Address: <wallet_address>"}` <br> **401:** `{"message": "❌ You must be authenticated to create a wallet."}`         |
| **POST**  | `/wallet/buy`           | 200, 401       | **200:** `{"message": "✅ Asset purchased successfully!"}` <br> **401:** `{"message": "❌ You must be authenticated to buy assets."}` <br> *(Other error messages possible)*  |
| **POST**  | `/wallet/sell`          | 200, 401       | **200:** `{"message": "✅ Asset sold successfully!"}` <br> **401:** `{"message": "❌ You must be authenticated to sell assets."}` <br> *(Other error messages possible)*   |
| **GET**   | `/wallet/balance`       | 200, 401, 404  | **200:** `{ "wallet_address": "...", "cash_balance": 10000.0, "net_worth": 15000.0, "assets": { ... } }` <br> **401:** `{"message": "❌ You must be authenticated"}` <br> **404:** `{"message": "❌ Wallet not found"}` |
| **GET**   | `/wallet/transactions`  | 200, 401, 404  | **200:** `{ "sent": [ ... ], "received": [ ... ] }` <br> **401:** `{"message": "❌ You must be authenticated."}` <br> **404:** `{"message": "❌ Wallet not found."}`         |
| **POST**  | `/blockchain/mine`      | 200, 400       | **200:** `{"message": "Block mined: <block_hash>"}` <br> **400:** `{"message": "❌ No pending transactions to mine."}`                                                        |
| **GET**   | `/blockchain`           | 200            | **200:** JSON array of blocks (blockchain)                                                                                                                                    |
| **GET**   | `/blockchain/validate`  | 200            | **200:** `{"message": "Blockchain valid: true"}` or `{"message": "Blockchain valid: false"}`                                                                                   |
| **GET**   | `/market/prices`        | 200            | **200:** `{ "BTC": 35000.0, "ETH": 2500.0, "USDT": 1.0 }`                                                                                                                     |
| **GET**   | `/market/price/{symbol}`| 200, 400       | **200:** `{"message": "Current price of BTC: $35000.0"}` <br> **400:** `{"message": "❌ Asset not found or price unavailable: BTC"}`                                           |

---

### 🔗 **Endpoints Used in Frontend**

| HTTP Method | Endpoint | Functionality |
|-------------|----------|--------------|
| **POST** | `/auth/register` | Registers a new user |
| **POST** | `/auth/login` | Logs in a user |
| **GET** | `/auth/check-session` | Validates session |
| **POST** | `/auth/logout` | Logs out the user |
| **POST** | `/wallet/create` | Creates a wallet |
| **GET** | `/wallet/balance` | Fetches user’s wallet balance |
| **POST** | `/wallet/buy` | Buys an asset |
| **POST** | `/wallet/sell` | Sells an asset |
| **GET** | `/wallet/transactions` | Fetches transaction history |
| **GET** | `/market/prices` | Fetches live crypto prices |
| **GET** | `/blockchain` | Fetches the blockchain |
| **POST** | `/blockchain/mine` | Mines a new block |

---

### More information

The [application.properties](src/main/resources/application.properties) file contains the configuration necessary for the correct functioning of the application. 

**The backend tests will simulate the interaction of a user directly with the API running in a container and exposed on port 3000**

### How to run

Go to Backend/blockchain folder and execute:
```bash
#Run Backend service
docker-compose up -d
```

Go to Frontend/
```bash
npm i
npm start
```
Projects are pre-configured to interact with each other.


## 📤 Submission

1. Solve the proposed tasks.
2. Continuously push the changes you have made.
3. Wait for the results.
4. Click submit challenge when you have reached your maximum score.

## 📊 Evaluation

The final score will be given according to whether or not the objectives have been met.

In this case, the challenge will be evaluated on 2000 (800 for backend tasks, 800 for frontend tasks and 400 for code quality) points which are distributed as follows:

### Backend

- **Task 1**: 50 points
- **Task 2**: 100 points
- **Task 3**: 150 points
- **Task 4**: 200 points
- **Task 5**: 300 points

### Frontend

- **Task 1**: 100 points
- **Task 2**: 350 points
- **Task 3**: 350 points

### Code quality

- **Code quality**: 400 points

## ❓ Additional information

**Q1: Can I change anything in the app?**

A1:  
- **Backend:** Yes, as it is a hackathon and the backend is Dockerised, you are free to modify anything within the project except what is already given in full, such as the Dockerfile, docker compose and functions within the code. 
- **Frontend:** You **must not** delete components that contain the `data-testid` prop. These elements are essential for evaluating your solution correctly. While you **can and should complete their implementation**, ensuring they display the correct values, **you must not remove them**. If you remove these components, your solution may not be evaluated correctly.

**Q2: Can I add resources that are not in pom.xml or package.json?**

A2: Yes, new resources can be added if necessary.

**Q3: Is it completely necessary to do the Dockerfile configuration first?**

A3: Yes. To ensure the integrity of the correction, a Dockerised environment is the safest way to go.

**Q4: Can I participate in both the fullstack and backend challenges at the same time?**

A4: No, you cannot participate in both challenges. You must choose only one challenge to compete in.

**Q5: What is the latest version of README?**

A5: The most recent version will always be the one that appears on the platform. In case there is something to correct in the readme, you can see the updated version on the NUWE website.