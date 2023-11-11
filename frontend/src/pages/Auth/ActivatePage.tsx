import { type ReactElement } from 'react';
import { BlankPageLayout } from '@Layout/Page';
import { CenteredContentLayout } from '@Layout/Content';

export function ActivatePage(): ReactElement {
  return (
    <BlankPageLayout>
      <CenteredContentLayout> Activate Page </CenteredContentLayout>
    </BlankPageLayout>
  );
}
