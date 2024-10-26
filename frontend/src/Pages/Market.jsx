import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Listsparameters from "../Components/Listsparameters";
import List from "../Components/List";

function Market() {
  return (
    <>
      <Header />
      <Sidebar />

      <div>
        <Listsparameters />
        <List />
      </div>
    </>
  );
}

export default Market;
