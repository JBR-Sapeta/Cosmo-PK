import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { extractError } from '@Utils/functions';
import { ROUTER_PARAMS } from '@Router/constant';
import { useActivateAccount } from '@Store/auth';

import styles from './ActivateAccount.module.css';

export function ActivateAccount(): ReactElement {
  const [searchParams] = useSearchParams();
  const { data, error, isPending, activateAccountMutation } =
    useActivateAccount();

  const token = searchParams.get(ROUTER_PARAMS.TOKEN);

  useEffect(() => {
    if (token) {
      activateAccountMutation({ token });
    }
  }, [token, activateAccountMutation]);

  const errorData = extractError(error);

  return (
    <div className={styles.form}>
      <div>
        <h2>Data</h2>
        <p>{data?.message}</p>
      </div>
      <div>
        <h2>Error</h2>
        <p>{errorData?.message}</p>
      </div>
      <div>
        <h2>Is Pending</h2>
        <p>{isPending}</p>
      </div>
    </div>
  );
}
