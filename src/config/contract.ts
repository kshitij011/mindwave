// Smart Contract Configuration
export const CONTRACT_CONFIG = {
    // Replace this with your actual deployed contract address
    ADDRESS: "0x0000000000000000000000000000000000000000",

    // ABI for the mintMindwaveToken function
    ABI: [
        "function mintMindwaveToken(string memory expertise, uint256 score) public returns (uint256)",
        "function balanceOf(address owner) public view returns (uint256)",
        "function tokenURI(uint256 tokenId) public view returns (string memory)",
    ],
};

// Network configuration
export const NETWORK_CONFIG = {
    // Add your network configuration here
    CHAIN_ID: 1, // Ethereum mainnet (change as needed)
    RPC_URL: "https://mainnet.infura.io/v3/YOUR_PROJECT_ID", // Replace with your RPC URL
};
