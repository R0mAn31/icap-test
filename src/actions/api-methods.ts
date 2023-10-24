import { changeDateFormat } from "./validator"

interface RequestProps { 
  method: string
  url: string
  onSuccess: (response: unknown) => void
  onError: (response: unknown) => void
  data?: unknown
  headers?: string[]
}

const executeRequest = async ({ onSuccess, onError, method, url, data, headers }: RequestProps) => {
  const requestOptions = {
    method: method,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  };

  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    
    const responseData = await response.json();
    onSuccess(responseData);
  } catch (error) {
    onError(error);
  }
};


const executeLogIn = async (data: UserData, onSuccess: (response: unknown) => void, onError: (response: unknown) => void) => {
  executeRequest({
    onSuccess: onSuccess,
    onError: onError,
    method: "post",
    url: "https://technical-task-api.icapgroupgmbh.com/api/login/",
    data: data,
  });
};

const getTableData = async (onSuccess: (response: unknown) => void, onError: (response: unknown) => void, offset?: number) => {
  const url = !offset ? "https://technical-task-api.icapgroupgmbh.com/api/table/" : `https://technical-task-api.icapgroupgmbh.com/api/table/?offset=${offset}`
  executeRequest({
    onSuccess: onSuccess,
    onError: onError,
    method: "get",
    url: url,
  });
};

const postNewItem = async (data: NewItem, onSuccess: (response: unknown) => void, onError: (response: unknown) => void) => {
  executeRequest({
    onSuccess: onSuccess,
    onError: onError,
    method: "post",
    url: "https://technical-task-api.icapgroupgmbh.com/api/table/",
    data: data
  });
};

const putTableData = async (data: TableItem, onSuccess: (response: unknown) => void, onError: (response: unknown) => void) => {
  const { id, ...dataWithoutId } = data;
  dataWithoutId["birthday_date"] = changeDateFormat(dataWithoutId["birthday_date"])

  executeRequest({
    onSuccess: onSuccess,
    onError: onError,
    method: "put",
    url: `https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`,
    data: dataWithoutId,
  });
};

const getCountOfItems = async (onSuccess: (response: unknown) => void, onError: (response: unknown) => void) => {
  executeRequest({
    onSuccess: onSuccess,
    onError: onError,
    method: "get",
    url: "https://technical-task-api.icapgroupgmbh.com/api/table/?limit=1",
  });
};

export { executeLogIn, getTableData, putTableData, postNewItem, getCountOfItems };