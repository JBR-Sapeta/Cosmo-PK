import { type ReactElement } from 'react';

import { BlankPageLayout } from '@Layout/Base';
import { CenteredContentLayout } from '@Layout/Content';
import { ActivateAccount } from '@Containers/Auth';

export function ActivatePage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout>
        <ActivateAccount />
      </CenteredContentLayout>
    </BlankPageLayout>
  );
}
