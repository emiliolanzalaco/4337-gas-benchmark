# ERC4337 Smart Accounts Gas Cost Benchmarking

This project aims to benchmark the difference in gas costs for various combinations of ERC4337 smart accounts.

## Problem Statement

With the increasing popularity and usage of ERC4337 smart accounts, it's crucial to understand the gas costs associated with different combinations of these accounts.

## Methodology

We have selected an ERC20 transfer as the benchmark operation. This operation is widely used and provides a good representation of the gas costs associated with interacting with smart accounts.

First, we make the operations with a regular EOA and a relayed ERC-2771 call. These will help form a good baseline to compare against.

We use a series of tests, each representing a unique combination of ERC4337 smart accounts. Each test measures the gas cost of a specific operation or set of operations. The results are then compared to understand the differences and identify the most and least gas-efficient combinations.

## Findings

### Regular EOA

Regular EOA sending transaction and paying for gas.
| Operation | Gas Used |
| -------------- | -------- |
| ERC20 transfer | 34,692 [[TX](https://sepolia.etherscan.io/tx/0x8ca44e0b209eebceeed0714a5cb4474897d290f4530c3d80943f0d9eaa425369)]|

### Gelato ERC2771 EOA Relay

| Operation      | Gas Used |
| -------------- | -------- |
| ERC20 transfer | 109,998  [[TX](https://sepolia.etherscan.io/tx/0xf05bb1dc256256e427751cb108d17cb1b9b83432949ea6c385771cf99e490aee)] |

### Smart Account

| Signer | Smart Account | Infrastructure | CreateAndTransferERC20                                                                                             | TransferERC20                                                                                                      |
| ------ | ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| ECDSA  | KERNEL        | GELATO         | 260,594 [[TX](https://sepolia.etherscan.io/tx/0x74a4f858b1d5107296d761552968619e1e1813a40ac1c5df7f9059a0ccd1b892)] | 102,685 [[TX](https://sepolia.etherscan.io/tx/0x668ff735a7d076e7b22ee66a9756657a60661ad1d1dbffc52aba3db307780076)] |
| ECDSA  | SAFE          | PIMLICO        | 416,772 [[TX](https://sepolia.etherscan.io/tx/0x09ee20395b3195f2a96e703ce015043e2a148ee96498523a7c2d61c0765b9b29)] | 124,081 [[TX](https://sepolia.etherscan.io/tx/0x4de9d5c1b357d774668bb0a095932bbf1909416eaec26e8e70d48b0678b48323)] |
| ECDSA  | SAFE          | GELATO         | 408,458 [[TX](https://sepolia.etherscan.io/tx/0x96c9e3a1916b9eccb3c84f6470fb0956b099310b7c64de26ec76f87c141c0fa5)] |          113,597 [[TX](https://sepolia.etherscan.io/tx/0x5e9622ceb3d66b266bd8b2ec9c07e8b925ff56c07b89aae3612c491b0ab43ffc)]                                                                                                          |

## Conclusion

_Summary of the findings and any conclusions drawn from the benchmarking._

## Future Work

_Any future work or improvements that can be made based on the findings._

## Contributing

_Information on how others can contribute to this project._

## License

_Information about the license._
