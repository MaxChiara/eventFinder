// require("dotenv").config();
import { createContext, useState, useRef } from "react";
import DataVizContainer from "./DataVizContainer";
import SearchForm from "./SearchForm";
import Title from "./Title";

export const DateContext = createContext(new Date().toISOString().slice(0, 19));

const App = () => {
  const [coord, setCoord] = useState([51.505, -0.09]);
  const loading = useRef(false);
  // formData viene passato a SearchForm solo per avere i valori default
  const [formData, setFormData] = useState({
    radius: 1000,
    //date: new Date().toISOString().slice(0, 19),
    date: "",
    endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
      .toISOString()
      .slice(0, 19),
  });

  if (formData.date == "") {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    var date = new Date(Date.now() - tzoffset).toISOString().slice(0, -5);
    setFormData({ ...formData, date: date });
  }

  function getInput(data) {
    setFormData({ ...formData, ...data });
  }

  function getCoord(coords) {
    setCoord(coords);
  }

  if (loading.current) {
    return (
      <div className="min-h-screen min-w-full flex">
        <h1 className="m-auto">Loading</h1>
      </div>
    );
  }
  return (
    <>
      <Title />
      <div className="container sm:m-auto w-[90%] h-full my-0 mx-auto">
        <DateContext.Provider value={null}>
          <SearchForm getInput={getInput} formData={formData} coord={coord} />
          <DataVizContainer
            formData={formData}
            getCoord={getCoord}
            coord={coord}
          />
        </DateContext.Provider>
      </div>
    </>
  );
};

export default App;
