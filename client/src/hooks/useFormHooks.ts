import { useCallback } from 'react';

type SetterFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export function useHandleChangeFactory() {
  return useCallback(
    <T>(setter: SetterFunction<T>) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setter(e.target.value as unknown as T),
    []
  );
}
