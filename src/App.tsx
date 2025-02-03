import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorMessage from "./components/ErorrMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
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
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  /*---------- Handler ---------------------*/
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setProduct(defaultProductObject);
    setIsOpen(false);
    setTempColors([]);
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

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors },
      ...prev,
    ]);
    close();
    console.log("product", products);

    console.log("date send to server successfully");
  };

  //-------------Render----------------------//
  const renderProductList = products.map((product) => (
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

  const renderProductColors = colors.map((color) => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));

          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));
  console.log(tempColors);
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
          <div className="flex flex-wrap space-x-2 space-y-2 text-center my-3">
            {tempColors.map((color) => (
              <span
                key={color}
                style={{ background: color }}
                className="text-white p-1 rounded-md my-1 text-sm"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap space-x-2 space-y-2 text-center my-3">
            {renderProductColors}
          </div>
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
