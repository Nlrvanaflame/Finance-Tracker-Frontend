import { useQuery } from "react-query";
import { getRecords } from "../../services/routes";


export const useGetRecord = () => {
    return useQuery('financeRecords', getRecords);
  };