const { createContext, useState } = require("react");

const GoalContext = createContext();

function FinishedGoalWrapper(props) {
  const [status, setStatus] = useState("inProgress");

  const toggleStatus = () => {
    if (status === "inProgress") {
        setStatus("finished");
    } else {
        setStatus("inProgress");
    }
  };

  return (
    <GoalContext.Provider value={{ status, toggleStatus }}>
      {props.children}
    </GoalContext.Provider>
  );
}

export { GoalContext, FinishedGoalWrapper };
