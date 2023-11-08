import { type ReactElement } from 'react';
import { BlankPageLayout } from '@Layout/View';
import { CenteredContentLayout } from '@Layout/Wrapper';

export function ActivatePage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout> Activate Page </CenteredContentLayout>
    </BlankPageLayout>
  );
}
