/**
 * Asynchronously loads the component for HomePage
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import PageLoadingWrapper from 'app/components/PageLoadingWrapper';

export const EthStakingPage = lazyLoad(
  () => import('./index'),
  module => module.EthStakingPage,
  {
    fallback: (
      <PageLoadingWrapper>
        <LoadingIndicator />
      </PageLoadingWrapper>
    ),
  },
);
