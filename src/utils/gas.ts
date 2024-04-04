import type { Hash } from "viem";
import { getTransactionReceipt } from "viem/actions";
import { publicClient } from "../clients/rpc";

export async function getGasUsed (hash: Hash): Promise<string> {
  const receipt = await getTransactionReceipt(publicClient, {hash})
  return receipt.gasUsed.toString();
}