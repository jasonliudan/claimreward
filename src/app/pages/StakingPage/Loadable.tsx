/**
 * Asynchronously loads the component for HomePage
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import PageLoadingWrapper from 'app/components/PageLoadingWrapper';

export const StakingPage = lazyLoad(
  () => import('./index'),
  module => module.StakingPage,
  {
    fallback: (
      <PageLoadingWrapper>
        <LoadingIndicator />
      </PageLoadingWrapper>
    ),
  },
);
