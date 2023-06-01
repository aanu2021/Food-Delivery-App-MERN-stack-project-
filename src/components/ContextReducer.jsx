import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

export const CartProvider = ({ children }) => {
  const [myEmail, setMyEmail] = useState(localStorage.getItem("userEmail"));
  const [key, setKey] = useState(`cart${myEmail}list`);
  useEffect(() => {
    setInterval(() => {
      setMyEmail(localStorage.getItem("userEmail"));
    }, 1);
  },[]);
  useEffect(() => {
    setKey(`cart${myEmail}list`);
  }, [myEmail]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        localStorage.setItem(
          JSON.stringify(key),
          JSON.stringify([
            ...state,
            {
              id: action.id,
              name: action.name,
              price: action.price,
              qty: action.qty,
              size: action.size,
              img: action.img,
            },
          ])
        );
        return [
          ...state,
          {
            id: action.id,
            name: action.name,
            price: action.price,
            qty: action.qty,
            size: action.size,
            img: action.img,
          },
        ];
      case "REMOVE":
        const newArr = [...state];
        newArr.splice(action.index, 1);
        localStorage.setItem(JSON.stringify(key), JSON.stringify(newArr));
        return newArr;
      case "DROP":
        const arr = [];
        localStorage.setItem(JSON.stringify(key), JSON.stringify(arr));
        return arr;
      default:
        console.log("Error is Reducer!!!");
    }
  };

  const getLocalStorageItems = () => {
    const list = localStorage.getItem(JSON.stringify(key));
    if (list) {
      return JSON.parse(localStorage.getItem(JSON.stringify(key)));
    } else {
      return [];
    }
  };



  const [state, dispatch] = useReducer(reducer, getLocalStorageItems());

  return (
    <>
      <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
          {children}
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
    </>
  );
};

export const useCart = () => {
  return useContext(CartStateContext);
};
export const useDispatchCart = () => {
  return useContext(CartDispatchContext);
};
