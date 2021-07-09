import { toastService } from "@ticketio/ui-react";

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
    if (res.ok) {
      const data: Barcode = await res.json();
      return data;
    }
    if(!res.ok) {
      console.error(`Error ${res.status} ${res.statusText}`);
      const data = await res.json()
      toastService.error({header: "Error", content: data.message})
      return res.statusText
    }
  } catch (error) {
    console.error(`${error}`)
    toastService.error({header: "Error", content: `${error}`})
    return error;
  }
};

export { fetchIt };
