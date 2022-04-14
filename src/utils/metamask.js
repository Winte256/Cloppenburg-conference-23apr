import detectEthereumProvider from '@metamask/detect-provider';
import { useToast } from 'vue-toastification';
// import Cookies from 'js-cookie';

import i18n from '@/langs/i18n';
import { contractAddress, smartData } from './constants';

let initedWeb3;
export const getContract = () => {
  const toast = useToast();
  let contract;
  console.log({ contractAddress });
  try {
    initedWeb3 = new window.Web3(
      new window.Web3.providers.HttpProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545/', // testnet rpc url
      ),
    );
    contract = new initedWeb3.eth.Contract(smartData, contractAddress);
  } catch (error) {
    toast.error(
      'Что то пошло не так при инициализации контракта. Попробуйте обновить страницу',
    );
  }

  console.log('contract.methods:', contract.methods);

  return contract;
};

export const getAcc = async () => {
  const toast = useToast();
  const provider = await detectEthereumProvider();

  if (!provider || !provider.isMetaMask) {
    toast.error(
      i18n.global.t('Установите расширение MetaMask и попробуйте снова!'),
    );
    return undefined;
  }

  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });

    return accounts[0];
  } catch (error) {
    return null;
  }
};

export const buyConf = async () => {
  const toast = useToast();
  const contract = getContract();
  const account = await getAcc();

  if (!account) {
    toast.error(
      i18n.global.t('Что то пошло не так при попытке получить адрес'),
    );
    return null;
  }

  const data = contract.methods.buy().encodeABI();

  const params = [
    {
      from: account,
      to: contractAddress,
      chainId: '0x61', // метамаск игнорит
      value: `0x${(10 ** 8 * 0.01).toString(16)}`, // 0.01 в hex
      data,
    },
  ];
  console.info('params: ', params[0]);
  // return new window.Web3(window.ethereum).eth.sendTransaction(
  //   {
  //     from: '0xB5a8974Cb445b74f83e7CF984236a4E434D6e35c',
  //     to: contractAddress,
  //     value: `0x${(10 ** 8 * 0.01).toString(16)}`,
  //     data,
  //     chain: '0x61',
  //   },
  //   (err, transactionId) => {
  //     if (err) {
  //       console.log('Payment failed', err);
  //     } else {
  //       console.log('Payment successful', transactionId);
  //     }
  //   },
  // );
  return window.ethereum.request({
    method: 'eth_sendTransaction',
    params,
  });
};
