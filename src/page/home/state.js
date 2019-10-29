import React, { useState, useEffect,useContext} from "react";
function useWindowPosition() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    // ...
  }, [position]);
  return position;
}
export default useWindowPosition