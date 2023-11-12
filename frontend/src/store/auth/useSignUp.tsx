import { useNavigate } from 'react-router-dom';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { ROUTER_PATH } from '@Router/constant';
import { UserSignUpBody, SuccesMessage } from './types';

type UseSignUp = {
  isPending: boolean;
  signUpMutation: UseMutateFunction<
    SuccesMessage,
    unknown,
    UserSignUpBody,
    unknown
  >;
};

export function useSignUp(): UseSignUp {
  const navigate = useNavigate();

  const { mutate: signUpMutation, isPending } = useMutation<
    SuccesMessage,
    unknown,
    UserSignUpBody,
    unknown
  >({
    mutationFn: (data) => signUp(data),
    onSuccess: (data) => {
      console.log(data);
      navigate(ROUTER_PATH.SIGN_IN);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { signUpMutation, isPending };
}

async function signUp(body: UserSignUpBody): Promise<SuccesMessage> {
  const response = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    throw new Error('Failed to sign up.');
  }

  return data;
}
