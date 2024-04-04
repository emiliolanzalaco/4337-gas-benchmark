import type { Account } from "./accounts/Account";
import type { BenchmarkResult } from "./types";
import { waitForTransactionReceipt } from "viem/actions";
import fs from "fs";
import { GelatoERC2771EOA } from "./accounts/adapters/Gelato2771EOA";
import { RegularEOA } from "./accounts/adapters/RegularEOA";
import { publicClient } from "./clients/rpc";
import { EcdsaKernelGelato } from "./accounts/adapters/EcdsaKernelGelato";

const accounts: Account[] = [
	new RegularEOA(),
	new GelatoERC2771EOA(),
	new EcdsaKernelGelato(),
];

async function main() {
	const benchmarkResult: BenchmarkResult = {};

	await Promise.all(
		accounts.map(async (account) => {
			console.log("Account: ", account.name);
			if (account.setup) await account.setup();
			if (account.type === "SmartAccount") {
				const firstHash = await account.sendERC20();
				const firstReceipt = await waitForTransactionReceipt(publicClient, {
					hash: firstHash,
				});
				const firstGasUsed = firstReceipt.gasUsed;

				const secondHash = await account.sendERC20();
				const secondReceipt = await waitForTransactionReceipt(publicClient, {
					hash: secondHash,
				});
				const secondGasUsed = secondReceipt.gasUsed;

				benchmarkResult[account.name] = {
					erc20TransferWithCreate: { hash: firstHash, gasUsed: firstGasUsed.toString() },
					erc20Transfer: { hash: secondHash, gasUsed: secondGasUsed.toString() },
				};
			} else if (account.type === "EOA") {
				const txHash = await account.sendERC20();
				const receipt = await waitForTransactionReceipt(publicClient, {
					hash: txHash,
				});
				const gasUsed = receipt.gasUsed;

				benchmarkResult[account.name] = {
					erc20Transfer: { hash: txHash, gasUsed: gasUsed.toString() },
				};
			}
		})
	);

	fs.writeFileSync("benchmarkResult.json", JSON.stringify(benchmarkResult));
}

console.log("Starting benchmark...");
main().then(() => console.log("Benchmark completed!"));
