# ERC4337 Smart Accounts Gas Cost Benchmarking

This project aims to benchmark the difference in gas costs for various combinations of ERC4337 smart accounts. 

## Problem Statement

With the increasing popularity and usage of ERC4337 smart accounts, it's crucial to understand the gas costs associated with different combinations of these accounts. This understanding will help in optimizing the usage and development of smart contracts that interact with these accounts.

## Methodology

We have selected an ERC20 transfer as the benchmark operation. This operation is widely used and provides a good representation of the gas costs associated with interacting with smart accounts.

First, we make the operations with a regular EOA and a relayed ERC-2771 call. These will help form a good baseline to compare against. 

We use a series of tests, each representing a unique combination of ERC4337 smart accounts. Each test measures the gas cost of a specific operation or set of operations. The results are then compared to understand the differences and identify the most and least gas-efficient combinations.

## Findings

### Regular EOA
Regular EOA sending transaction and paying for gas.
| Operation      | Gas Used |
| --------------------- | -------- |
| ETH transfer | 21,000   |
| ERC20 transfer | 34,460 |

### Smart Account
| Signer | Smart Account | Infrastructure | Operation | Gas Cost |
|--------|---------------|----------------|-----------|----------|
|        |               |                |           |          |
|        |               |                |           |          |
|        |               |                |           |          |

*Note: This is a placeholder table. Replace with actual data.*

## Conclusion

*Summary of the findings and any conclusions drawn from the benchmarking.*

## Future Work

*Any future work or improvements that can be made based on the findings.*

## Contributing

*Information on how others can contribute to this project.*

## License

*Information about the license.*