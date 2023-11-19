import { type ReactElement } from 'react';

import { BlankPageLayout } from '@Layout/Base';
import { CenteredContentLayout } from '@Layout/Content';
import { RecoveryForm } from '@Containers/Auth';

export function RecoveryPage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout>
        <RecoveryForm />
      </CenteredContentLayout>
    </BlankPageLayout>
  );
}