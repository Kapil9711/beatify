interface IResponse {
  isSuccess?: boolean;
  message?: string;
  data?: any;
}

const getFormatedResponse = ({
  isSuccess = true,
  message = "Successfull",
  data = [],
}: IResponse = {}): IResponse => {
  const obj = { isSuccess: isSuccess, message: message, data };
  return obj;
};

export default getFormatedResponse;
