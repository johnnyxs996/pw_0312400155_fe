export type ErrorModelType =
  | 'InvalidCredentialsError'
  | 'OperationAmountTooLargeError'
  | 'ResourceAlreadyInStatusError'
  | 'ResourceNotFoundError';
export const ErrorModelType = {
  InvalidCredentialsError: 'InvalidCredentialsError' as ErrorModelType,
  OperationAmountTooLargeError: 'OperationAmountTooLargeError' as ErrorModelType,
  ResourceAlreadyInStatusError: 'ResourceAlreadyInStatusError' as ErrorModelType,
  ResourceNotFoundError: 'ResourceNotFoundError' as ErrorModelType
};
