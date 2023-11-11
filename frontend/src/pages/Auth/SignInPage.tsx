import { type ReactElement } from 'react';
import { BlankPageLayout } from '@Layout/Base';
import { CenteredContentLayout } from '@Layout/Content';
import { SignInForm } from '@Containers/Auth';

export function SignInPage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout>
        <SignInForm />
      </CenteredContentLayout>
    </BlankPageLayout>
  );
}
