import { useEffect, useState } from "react";

const useGetAverageStorePrice = (id: string | undefined | null) => {
  const [storeAvg, setStoreAvg] = useState(0);

  const getStoreAvg = async (id: string) => {
    const rawRes = await fetch(`/api/storeAvg?id=${id}`);
    const jsonRes = await rawRes.json();

    setStoreAvg(jsonRes.data);
  };

  useEffect(() => {
    if (!id) return;
    (async () => await getStoreAvg(id))();
  }, [storeAvg, id]);

  return { storeAvg };
};

export default useGetAverageStorePrice;
