import { useRef, useEffect } from "react";

const useInterval = (cb: any, delay = 1000) => {
  const ref = useRef({ interval: undefined as any, cb: () => {} });

  useEffect(() => {
    ref.current.cb = cb;
  }, [cb]);

  const start = () => {
    if (ref.current.interval === undefined) {
      ref.current.interval = setInterval(() => {
        ref.current.cb();
      }, delay);
    }
  };
  const stop = () => {
    ref.current.interval = clearInterval(ref.current.interval);
  };

  return [start, stop];
};

export default useInterval;
