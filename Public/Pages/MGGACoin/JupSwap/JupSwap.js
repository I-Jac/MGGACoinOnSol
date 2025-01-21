(async function initializeJupiter() {
    // Wait for wallet connection
    while (!window.walletContext) {
        document.getElementById("wallet-status").textContent = "Waiting for wallet connection...";
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const { publicKey, signTransaction, signAllTransactions } = window.walletContext;

    // Initialize Jupiter Terminal
    try {
        if (window.Jupiter) {
            window.Jupiter.init({
                displayMode: "integrated",
                integratedTargetId: "integrated-terminal",
                endpoint: "https://misty-thrilling-scion.solana-mainnet.quiknode.pro/cf8404eb59e4ff88ff2ef1904ea16e8de1de0135/",
                defaultExplorer: "Solscan",
                enableWalletPassthrough: true,
                passthroughWalletContextState: {
                    publicKey,
                    connected: !!publicKey,
                    signTransaction,
                    signAllTransactions,
                },
                formProps: {
                    fixedOutputMint: true,
                    fixedInputMint: true,
                    swapMode: "ExactIn",
                    initialAmount: "1000000000",
                    initialInputMint: "So11111111111111111111111111111111111111112",
                    initialOutputMint: "FoyZoKXj8LxH29rND5AH5QcqGcH7FqeD8kjmN9zmpump",
                    initialSlippageBps: 5,
                },
            });
            console.log("Jupiter Terminal initialized successfully.");
        }
    } catch (err) {
        console.error("Failed to initialize Jupiter Terminal:", err);
    }
})();
