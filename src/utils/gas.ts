import type { Hash } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "../clients/rpc";

export async function getGasUsed (hash: Hash): Promise<string> {
  const receipt = await waitForTransactionReceipt(publicClient, {hash})
  return receipt.gasUsed.toString();
}