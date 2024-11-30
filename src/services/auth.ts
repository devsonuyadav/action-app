import api from './configure';

export const login = async (username: string, password: string) => {
  const response = await api.get(
    `/User/AuthenticateUser?username=${username}&password=${password}`,
  );
  const data = response.data;

  if (data?.statusCode !== 200) {
    throw new Error(data?.errorMessage);
  }
  return data;
};

export const verifyUser = async (employeeId: string) => {
  const response = await api.get(
    `/User/GetUserByEmployeeId?employeeId=${employeeId}`,
  );
  const data = response.data;

  if (data?.statusCode !== 200) {
    throw new Error(data?.errorMessage);
  }
  return data;
};
