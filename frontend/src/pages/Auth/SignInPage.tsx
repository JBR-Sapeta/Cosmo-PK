import { type ReactElement } from 'react';
import { BlankPageLayout } from '@Layout/View';
import { CenteredContentLayout } from '@Layout/Wrapper';

export function SignInPage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout>Sign In Page</CenteredContentLayout>
    </BlankPageLayout>
  );
}
