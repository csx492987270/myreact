import React, { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

export const AppContext = createContext(null);

export const AppWrapper = observer(({ children }) => {
  const store = useLocalStore(() => (
    {
      count: 1,
      obj:"",
      get getCount() {
        return store.count;
      },
      handleCount() {
        store.count += 2;
      },
      get getObj() {
        return store.obj;
      },
      saveObj(obj) {
        console.log(obj)
        store.obj=obj
      } 
    }
  ));
  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
});