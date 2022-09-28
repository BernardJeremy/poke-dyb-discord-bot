import dbManager from '../store/dbManager';
import { InvocationData } from '../types/invocation.types';

const getAllInvocations = () => {
  const invocations = dbManager.getAllInvocationsFromDb();

  return invocations;
};

const getOneInvocationByMessageId = (invocationMessageId: string) => {
  const invocations = getAllInvocations();

  const invocation = invocations.find(
    (oneInvocation) => oneInvocation.invocationMessageId === invocationMessageId,
  );

  return invocation || null;
};

const createInvocation = (invocationData: InvocationData) => {
  const invocations = getAllInvocations();
  invocations.push(invocationData);

  dbManager.updateInvocationsFromDb(invocations);

  return invocationData;
};

const updateInvocation = (invocationData: InvocationData) => {
  const invocations = getAllInvocations();

  invocations.splice(invocations.findIndex(
    (invocation) => (invocationData.invocationMessageId === invocation.invocationMessageId),
  ), 1);
  invocations.push(invocationData);

  dbManager.updateInvocationsFromDb(invocations);

  return invocationData;
};

const deleteInvocation = (invocationData: InvocationData) => {
  const invocations = getAllInvocations();

  invocations.splice(invocations.findIndex(
    (invocation) => invocationData.invocationMessageId === invocation.invocationMessageId,
  ), 1);

  dbManager.updateInvocationsFromDb(invocations);

  return invocationData;
};

export {
  getAllInvocations,
  getOneInvocationByMessageId,
  createInvocation,
  updateInvocation,
  deleteInvocation,
};
