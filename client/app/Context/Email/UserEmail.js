const { useContext, createContext, useState } = require("react");

const userEmailContext = createContext();

export function EmailProvider({ children }) {
  const [Email, setEmailContext] = useState("");
  const value = {
    Email,
    setEmailContext,
  };
  return (
    <userEmailContext.Provider value={value}>
      {children}
    </userEmailContext.Provider>
  );
}
export function useEmail() {
  return useContext(userEmailContext);
}
