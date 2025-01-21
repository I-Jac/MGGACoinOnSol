// Function to initialize wallets and handle connection logic
async function initializeWalletAdapter() {
    console.log("Initializing wallets...");

    // Initialize wallets
    const wallets = {
        phantom: new PhantomWalletAdapter(),
        solflare: new SolflareWalletAdapter(),
        coinbase: new CoinbaseWalletAdapter(),
    };

    console.log("Wallets initialized:", wallets);

    const walletStatus = document.getElementById("wallet-status");

    // Add event listeners for each wallet button
    document.getElementById("connect-phantom").addEventListener("click", () => connectWallet("phantom"));
    document.getElementById("connect-solflare").addEventListener("click", () => connectWallet("solflare"));
    document.getElementById("connect-coinbase").addEventListener("click", () => connectWallet("coinbase"));

    async function connectWallet(walletKey) {
        const wallet = wallets[walletKey];

        // Check if wallet is available
        if (!wallet) {
            walletStatus.textContent = `Wallet adapter for ${walletKey} is not available.`;
            return;
        }

        try {
            // Attempt to connect to the wallet
            await wallet.connect();
            console.log(`Connected to wallet: ${wallet.publicKey.toBase58()}`);

            // Update the UI with the wallet status
            walletStatus.textContent = `Connected to ${walletKey.charAt(0).toUpperCase() + walletKey.slice(1)} wallet: ${wallet.publicKey.toBase58()}`;
            
            // Save wallet context for integration with other systems
            window.walletContext = {
                publicKey: wallet.publicKey,
                signTransaction: wallet.signTransaction.bind(wallet),
                signAllTransactions: wallet.signAllTransactions.bind(wallet),
            };
        } catch (err) {
            console.error(`Error connecting to ${walletKey} wallet:`, err);
            walletStatus.textContent = `Failed to connect to ${walletKey} wallet.`;
        }
    }
}
