import { type ReactElement } from 'react';
import { BlankPageLayout } from '@Layout/Base';
import { CenteredContentLayout } from '@Layout/Content';
import { SignUpForm } from '@Containers/Auth';

export function SignUpPage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout>
        <SignUpForm />
      </CenteredContentLayout>
    </BlankPageLayout>
  );
}
