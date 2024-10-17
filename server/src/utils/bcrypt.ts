import { compare, genSalt, hash } from 'bcrypt';

export const encrypt = async (payload: string): Promise<string> => {
  const salt = await genSalt();
  return await hash(payload, salt);
};

export const compareDataToHash = async (
  data: string,
  hash: string,
): Promise<string> => {
  return await compare(data, hash);
};
