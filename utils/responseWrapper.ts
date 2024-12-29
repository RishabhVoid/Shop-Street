export type ResponseWrapperType<DataType> = {
  status: 1 | 0;
  message: string;
  error: string;
  data: DataType | null;
};

class ResponseWrapper {

  static success<DataType>(data: DataType, message: string, error: string): ResponseWrapperType<DataType> {
    return { status: 1, message, error, data }
  };

  static failure<DataType>(data: DataType, message: string, error: string): ResponseWrapperType<DataType> {
    return { status: 0, message, error, data }
  };
};

export default ResponseWrapper;
