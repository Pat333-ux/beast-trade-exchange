"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function TradeExchangeDashboard() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [listings, setListings] = useState([]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask to access the Trade Exchange Portal.");
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!description || !price) return;
    alert(`Creating marketplace listing for: ${description} at ${price} ETH`);
    // Integration call to backend /api/trade/listing/create
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">BEAST Trade Exchange</h1>
            <p className="text-sm text-slate-400 mt-1">Decentralized Peer-to-Peer Commerce & Barter Marketplace</p>
          </div>
          <div>
            {account ? (
              <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm font-mono text-emerald-400">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-5 py-2 rounded-lg transition-colors"
              >
                {loading ? "Connecting..." : "Connect Trader Wallet"}
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-sky-400">Create Item Listing</h2>
            <form onSubmit={handleCreateListing} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Item Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Organic Honey (1 Quart) / Steel Work"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Price (ETH / Token)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.05"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg transition-colors text-sm"
              >
                Publish Listing On-Chain
              </button>
            </form>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-sky-400">Active Marketplace Inventory</h2>
            {listings.length === 0 ? (
              <p className="text-slate-400 text-sm mt-8 text-center">No active listings available in the exchange.</p>
            ) : (
              <div className="space-y-3">
                {/* Marketplace listing items mapping */}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
