import { EOA } from './accounts/adapters/EOA';
import type { Account } from './accounts/Account';
import type { BenchmarkResult } from './types';
import { waitForTransactionReceipt } from 'viem/actions';
import fs from "fs"

const accounts: Account[] = [
  new EOA()
]

export async function main () {
  const benchmarkResult: BenchmarkResult = {}
  for (const account of accounts) {
    await account.setup()
    const [erc20TxHash, ethTxHash] = await Promise.all([
      account.sendERC20(),
      account.sendETH()
    ])
    
    const [erc20Receipt, ethReceipt] = await Promise.all([
      waitForTransactionReceipt(account.client, { hash: erc20TxHash }),
      waitForTransactionReceipt(account.client, { hash: ethTxHash })
    ]);
    
    const erc20GasUsed = erc20Receipt.gasUsed
    const ethGasUsed = ethReceipt.gasUsed

    benchmarkResult[account.name] = {
      erc20: { hash: erc20TxHash, gasUsed: erc20GasUsed.toString() },
      eth: { hash: ethTxHash, gasUsed: ethGasUsed.toString() }
    }
  }

  fs.writeFileSync("benchmarkResult.json", JSON.stringify(benchmarkResult))
}

console.log("Starting benchmark...")
main().then(() => console.log("Benchmark completed!"))
