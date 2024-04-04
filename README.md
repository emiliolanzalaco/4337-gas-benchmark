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
| ERC20 transfer | 34,460 |

### Gelato ERC2771 EOA Relay

| Operation      | Gas Used |
| -------------- | -------- |
| ERC20 transfer | 109,986  |

### Smart Account

| Signer | Smart Account | Infrastructure | CreateAndTransferERC20                                                                                           | TransferERC20                                                                                                     |
| ------ | ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ECDSA  | KERNEL        | GELATO         | 259,505 [[TX](https://sepolia.etherscan.io/tx/0x70277a4b06aae31b49605e9cd39b9fbf28b3c6e500f9153fb5e365b5c2dc5c7f)] | 107,473 [[TX](https://sepolia.etherscan.io/tx/0x0dce7e139ba8fc028dc7e5a7c277b57e4a1bd1bf4094bee0d10f093508697cd1)] |
|        |               |                |                                                                                                                  |                                                                                                                   |
|        |               |                |                                                                                                                  |                                                                                                                   |

## Conclusion

_Summary of the findings and any conclusions drawn from the benchmarking._

## Future Work

_Any future work or improvements that can be made based on the findings._

## Contributing

_Information on how others can contribute to this project._

## License

_Information about the license._
