import { type ReactElement } from 'react';
import { BlankPageLayout } from '@Layout/View';
import { CenteredContentLayout } from '@Layout/Wrapper';

export function SignUpPage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout>Sign Up Page </CenteredContentLayout>
    </BlankPageLayout>
  );
}
