interface Barcode {
  barcode: string;
  firstName: string;
  lastName: string;
}

interface Barcode extends Array<Barcode> {}

interface RequestProps {
  url: RequestInfo;
  init?: RequestInit;
}

const fetchIt = async ({ url, init }: RequestProps) => {
  try {
    const res = await fetch(url, init);
    if (res.status === 201 || res.status === 200) {
      const data: Barcode = await res.json();
      return data;
    }
    if (res.status === 400) {
      console.error(`Error ${res.status} ${res.statusText}`);
      return await res.json();
    }
  } catch (error) {
    console.error(`Error pups ${error}`);
    return error;
  }
};

export { fetchIt };
