import { type ReactElement } from 'react';

import { BlankPageLayout } from '@Layout/Base';
import { CenteredContentLayout } from '@Layout/Content';
import { ResetPasswordForm } from '@Containers/Auth';

export function ResetPage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout>
        <ResetPasswordForm />
      </CenteredContentLayout>
    </BlankPageLayout>
  );
}