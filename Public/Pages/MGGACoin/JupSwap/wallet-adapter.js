(async function initializeWalletAdapter() {
    const {
        PhantomWalletAdapter,
        SolflareWalletAdapter,
        CoinbaseWalletAdapter,
        SolletWalletAdapter,
    } = solanaWalletAdapterWallets;

    // Initialize wallets
    const wallets = {
        phantom: new PhantomWalletAdapter(),
        solflare: new SolflareWalletAdapter(),
        coinbase: new CoinbaseWalletAdapter(),
        sollet: new SolletWalletAdapter(),
    };

    const walletStatus = document.getElementById("wallet-status");

    // Add event listeners for each wallet button
    document.getElementById("connect-phantom").addEventListener("click", () => connectWallet("phantom"));
    document.getElementById("connect-solflare").addEventListener("click", () => connectWallet("solflare"));
    document.getElementById("connect-coinbase").addEventListener("click", () => connectWallet("coinbase"));
    document.getElementById("connect-sollet").addEventListener("click", () => connectWallet("sollet"));

    async function connectWallet(walletKey) {
        const wallet = wallets[walletKey];

        try {
            // Attempt wallet connection
            await wallet.connect();
            console.log(`Connected to wallet: ${wallet.publicKey.toBase58()}`);

            // Update wallet status
            walletStatus.textContent = `Connected to ${walletKey.charAt(0).toUpperCase() + walletKey.slice(1)} wallet: ${wallet.publicKey.toBase58()}`;

            // Save wallet context for Jupiter integration
            window.walletContext = {
                publicKey: wallet.publicKey,
                signTransaction: wallet.signTransaction.bind(wallet),
                signAllTransactions: wallet.signAllTransactions.bind(wallet),
            };
        } catch (err) {
            console.error(`Failed to connect to ${walletKey} wallet:`, err);
            walletStatus.textContent = `Failed to connect to ${walletKey} wallet.`;
        }
    }
})();
