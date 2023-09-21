import { useMutation } from "react-query";
import { createRecord, deleteRecord, editRecord } from "../../services/routes";
import queryClient from "../..";
import { updateRecord } from "../../models/financialRecord";



export const useFinanceMutations = () => {
    return {
      useCreateRecord: () => {
        return useMutation(createRecord, {
          onSuccess: () => {
            queryClient.invalidateQueries('financeRecords');
          },
        });
      },
      useEditRecord: () => {
        return useMutation(({ id, data }: { id: string; data: updateRecord }) => editRecord(id, data), {
          onSuccess: () => {
            queryClient.invalidateQueries('financeRecords');
          },
        });
      },
      useDeleteRecord: () => {
        return useMutation(deleteRecord, {
          onSuccess: () => {
            queryClient.invalidateQueries('financeRecords');
          },
        });
      },
    };
  };