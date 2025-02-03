import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorMessage from "./components/ErorrMessage";

const App = () => {
  const defaultProductObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /*---------- State ---------------------*/
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [errMsg, setErrorMsg] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /*---------- Handler ---------------------*/
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setProduct(defaultProductObject);
    setIsOpen(false);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrorMsg({
      ...errMsg,
      [name]: "",
    });
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    // ** check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrorMsg(errors);
      return;
    }
    console.log("date send to server successfully");
  };

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
      <Input
        input={input}
        type={input.type}
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />

      {/* {!Object.values(errMsg).every((value) => value === "") && ( <ErrorMessage msg={errMsg[input.name]} />  )} */}
      <ErrorMessage msg={errMsg[input.name]} />
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
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex justify-center items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
