export const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;
export const env = process.env.NODE_ENV;
export const smartData = [
  {
    inputs: [],
    name: 'gift',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'getNumberGift',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
