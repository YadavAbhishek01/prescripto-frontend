import React, { useEffect, useState } from "react";
import { Spin } from "antd";

const GlobalLoader = () => {
  const [spinning, setSpinning] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);
      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
      }
    }, 100);

    return () => clearInterval(interval); // cleanup
  }, []);

  return <Spin spinning={spinning} percent={percent} fullscreen >Please Wait ...</Spin>;
};

export default GlobalLoader;
