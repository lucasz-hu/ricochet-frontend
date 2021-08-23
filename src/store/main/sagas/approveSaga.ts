import { approve } from 'api/ethereum';
import { erc20ABI } from 'constants/abis';
import {
  USDCAddress, USDCxAddress,
  WETHAddress, WETHxAddress,
  WBTCAddress, WBTCxAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { handleError } from 'utils/handleError';
import { usdcApprove, wethApprove, wbtcApprove } from '../actionCreators';
import {
  checkIfApproveUsdc,
  checkIfApproveWeth,
  checkIfApproveWbtc,
} from './checkIfApprove';
import { getBalances } from './getBalances';

export function* approveSaga(
  tokenAddress: string,
  superTokenAddress: string,
  amount: string,
) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract,
    tokenAddress,
    erc20ABI,
  );
  yield call(approve, contract, address, superTokenAddress, amount);
  yield call(getBalances, address);
}

export function* approveUsdcSaga({ payload }: ReturnType<typeof usdcApprove>) {
  try {
    const amount = web3.utils.toWei(payload.value);
    yield call(approveSaga, USDCAddress, USDCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveUsdc);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  }
}

export function* approveWethSaga({ payload }: ReturnType<typeof wethApprove>) {
  try {
    const amount = web3.utils.toWei(payload.value);
    yield call(approveSaga, WETHAddress, WETHxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWeth);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  }
}

export function* approveWbtcSaga({ payload }: ReturnType<typeof wbtcApprove>) {
  try {
    console.log(payload.value);
    const amount = web3.utils.toWei(payload.value).substring(0, payload.value.length - 8);
    console.log(amount);
    yield call(approveSaga, WBTCAddress, WBTCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWbtc);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  }
}
