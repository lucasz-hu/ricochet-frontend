import React, { useEffect } from 'react';
import { MainLayout } from 'containers/MainLayout';
import { useDispatch } from 'react-redux';
import { mainGetData } from 'store/main/actionCreators';
import { Header } from 'components/layout/Header';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { WethDowngrade } from 'containers/main/WethDowngrade';
import { UsdcDowngrade } from 'containers/main/UsdcDowngrade';
import { WbtcDowngrade } from 'containers/main/WbtcDowngrade';
import {
  USDCAddress, USDCxAddress, RICAddress,
  WETHAddress, WETHxAddress,
  WBTCAddress, WBTCxAddress,
} from 'constants/polygon_config';
import { UsdcUpgrade } from 'containers/main/UsdcUpgrade';
import { WethUpgrade } from 'containers/main/WethUpgrade';
import { WbtcUpgrade } from 'containers/main/WbtcUpgrade';
import { UsdcSubscription } from 'containers/main/UsdcSubscription';
import { WethSubscription } from 'containers/main/WethSubscription';
import { UsdcWethFlow } from 'containers/main/UsdcWethFlow';
import { WethUsdcFlow } from 'containers/main/WethUsdcFlow';
import styles from './styles.module.scss';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    address,
    balances,
    disabled,
    hasUsdcApprove,
    hasWethApprove,
    hasWbtcApprove,
    usdcFlowQuery,
    wethFlowQuery,
  } = useShallowSelector(selectMain);

  useEffect(() => {
    dispatch(mainGetData());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className={styles.header}>
        <Header
          account={address || 'Connecting'}
          ricBalance={balances && balances[RICAddress]}
        />
      </div>
      <div className={styles.list}>
        <UsdcWethFlow
          balance={balances && balances[USDCxAddress]}
          totalFlows={usdcFlowQuery?.totalFlows}
          flowsOwned={usdcFlowQuery?.flowsOwned}
          placeholder={usdcFlowQuery?.placeholder}
        />
        <WethUsdcFlow
          balance={balances && balances[WETHxAddress]}
          totalFlows={wethFlowQuery?.totalFlows}
          flowsOwned={wethFlowQuery?.flowsOwned}
          placeholder={wethFlowQuery?.placeholder}
        />

        <UsdcUpgrade
          balance={balances && balances[USDCAddress]}
          disabled={disabled}
          hasUsdcApprove={hasUsdcApprove}
        />

        <WethUpgrade
          balance={balances && balances[WETHAddress]}
          disabled={disabled}
          hasWethApprove={hasWethApprove}
        />

        <WbtcUpgrade
          balance={balances && balances[WBTCAddress]}
          disabled={disabled}
          hasWbtcApprove={hasWbtcApprove}
        />

        <UsdcDowngrade
          balance={balances && balances[USDCxAddress]}
          disabled={disabled}
        />

        <WethDowngrade
          balance={balances && balances[WETHxAddress]}
          disabled={disabled}
        />

        <WbtcDowngrade
          balance={balances && balances[WBTCxAddress]}
          disabled={disabled}
        />

        <UsdcSubscription />
        <WethSubscription />
      </div>
    </MainLayout>
  );
};
