(async function initializeWalletAdapter() {
    const {
        PhantomWalletAdapter,
        SolflareWalletAdapter,
        CoinbaseWalletAdapter,
        SolletWalletAdapter,
    } = solanaWalletAdapterWallets;

    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new CoinbaseWalletAdapter(),
        new SolletWalletAdapter(),
    ];

    // Simple wallet selection (can be replaced with a UI modal)
    const wallet = wallets.find((w) => w.readyState === "Installed") || wallets[0];

    try {
        await wallet.connect();
        console.log("Connected to wallet:", wallet.publicKey.toBase58());

        // Save wallet context for Jupiter integration
        window.walletContext = {
            publicKey: wallet.publicKey,
            signTransaction: wallet.signTransaction.bind(wallet),
            signAllTransactions: wallet.signAllTransactions.bind(wallet),
        };
    } catch (err) {
        console.error("Failed to connect wallet:", err);
    }
})();
