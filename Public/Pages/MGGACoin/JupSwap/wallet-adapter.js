// Wallet Adapter for Static Site
(async function initializeWalletAdapter() {
    const { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter, SolletWalletAdapter } = solanaWalletAdapterWallets;
    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new CoinbaseWalletAdapter(),
        new SolletWalletAdapter(),
    ];

    // Simulating a simple "Connect Wallet" setup for example
    const wallet = wallets[0]; // Default: Phantom
    try {
        await wallet.connect();
        console.log("Connected to wallet:", wallet.publicKey.toBase58());

        // Save context for Jupiter Integration
        window.walletContext = {
            publicKey: wallet.publicKey,
            signTransaction: wallet.signTransaction.bind(wallet),
            signAllTransactions: wallet.signAllTransactions.bind(wallet),
        };
    } catch (err) {
        console.error("Failed to connect wallet:", err);
    }
})();
