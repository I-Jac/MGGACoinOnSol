import { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter } from '@solana/wallet-adapter-wallets';

(async function initializeWalletAdapter() {
    // Import wallets directly from the Solana Wallet Adapter package
    const {
        PhantomWalletAdapter,
        SolflareWalletAdapter,
        CoinbaseWalletAdapter,
    } = solanaWalletAdapterWallets;

    console.log("Initializing wallets...");

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

        // Check if wallet is available in the browser
        if (!wallet) {
            walletStatus.textContent = `Wallet adapter for ${walletKey} is not available.`;
            return;
        }

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
            console.error(`Error connecting to ${walletKey} wallet:`, err);
            walletStatus.textContent = `Failed to connect to ${walletKey} wallet.`;
        }
    }
})();
