import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

const App = () => {
  /*---------- State ---------------------*/
  let [isOpen, setIsOpen] = useState(false);

  /*---------- Handler ---------------------*/
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  //-------------Render----------------------//
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label
        htmlFor={input.id}
        className="mb-2 text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input input={input} type={input.type} name={input.name} id={input.id} />
    </div>
  ));

  return (
    <main className="container mx-auto">
      <Button
        className="bg-indigo-700 hover:bg-indigo-800"
        onClick={() => {
          open();
        }}
      >
        Add
      </Button>
      <div className=" m-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-2 md:gap-4 p-2  ">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} close={close} open={open} title="Add New Product">
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex justify-center items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={()=>{
              close();
            }}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
