import React, { forwardRef, useEffect } from "react";
import tst from "react-native-toast-message";

const Toast = forwardRef((props, ref) => {
  useEffect(() => {
    if (ref) {
      tst.setRef(ref);
    }
  }, [ref]);

  return <Toast />;
});

export default Toast;
