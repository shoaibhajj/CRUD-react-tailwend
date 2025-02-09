import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { ICategory, IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorMessage from "./components/ErorrMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import HomePage from "./components/HomePage";
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
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [selectedCategory, setSelectedCategory] = useState(categories[3]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObject);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [productToEditIndex, setProductToEditIndex] = useState(0);
  const [productToDeleteIndex, setProductToDeleteIndex] = useState(0);
  const [productToDelete, setProductToDelete] =
    useState<IProduct>(defaultProductObject);
  /*---------- Handler ---------------------*/
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
        setProduct(defaultProductObject);
        setTempColors([]);
       
  };
  const openEditModal = () => {
    setIsOpenEditModal(true);
  };

  const closeEditMoal = () => {
    setIsOpenEditModal(false);
  };
  const closeDeleteMoal = () => {
    setIsOpenDeleteModal(false);
  };
  const openDeleteMoal = () => {
    setIsOpenDeleteModal(true);
  };
  const cancel = () => {
    setProduct(defaultProductObject);
    setTempColors([]);
    setIsOpenEditModal(false);  
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
  const onChangeEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrorMsg({
      ...errMsg,
      [name]: "",
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, imageURL, price, colors } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
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
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObject);
    setTempColors([]);
    close();

    console.log("date update to server successfully");
  };
  const submitEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, imageURL, price, colors } = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: colors,
    });

    // ** check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrorMsg(errors);
      return;
    }
    productToEdit.colors = tempColors.concat(productToEdit.colors);
    const updatedProducts = [...products];
    updatedProducts[productToEditIndex] = productToEdit;

    setProducts(updatedProducts);

    setProduct(defaultProductObject);
    setTempColors([]);
    closeEditMoal();

    console.log("date send to server successfully");
  };
  const submitDeleteHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProducts = [...products];
    updatedProducts.splice(productToDeleteIndex, 1);

    setProducts(updatedProducts);

    setProduct(defaultProductObject);
    setTempColors([]);
    closeDeleteMoal();

    console.log("data Deleted from server successfully");
  };

  //-------------Render----------------------//
  const renderProductList = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={index}
      setProductToEditIndex={setProductToEditIndex}
      setProductToDelete={setProductToDelete}
      openDeleteModal={openDeleteMoal}
      setProductToDeleteIndex={setProductToDeleteIndex}
    />
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
  const renderFormInputListForEdit = formInputsList.map((input) => (
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
        value={productToEdit[input.name]}
        onChange={(e) => {
          onChangeEditHandler(e);
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
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));

          return;
        }

        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <>
      <main className="container mx-auto px-2 md:px-20">
        <HomePage open={setIsOpen} />
        <div className="flex justify-between items-center content-center max-w-sm md:max-w-lg lg:max-w-5xl mx-auto px-3  ">
          <h2 className="flex-8 text-5xl font-bold">
            Latest <span className="text-indigo-700">Prodcuts</span>{" "}
          </h2>
          <Button
            className="bg-indigo-700 hover:bg-indigo-800 flex-1 "
            onClick={() => {
              open();
            }}
            width="w-fit"
            id="productList"
          >
            Build Product
          </Button>
        </div>

        <div className=" m-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-2 md:gap-4 p-2  ">
          {renderProductList}
        </div>

        {/* // Add Modal product // */}
        <Modal
          isOpen={isOpen}
          close={close}
          open={open}
          title="Add New Product"
        >
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputList}
            <Select
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
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
            {errMsg["colors"]
              ? tempColors.length <= 0 && (
                  <ErrorMessage msg={errMsg["colors"]} />
                )
              : null}

            <div className="flex justify-center items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                Submit
              </Button>
              <Button
                type="button"
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
        {/* // Edit Modal product // */}
        <Modal
          isOpen={isOpenEditModal}
          close={closeEditMoal}
          open={open}
          title="Edit Product"
        >
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderFormInputListForEdit}
            <Select
              selectedCategory={productToEdit.category}
              setSelectedCategory={(value) => {
                setProductToEdit({ ...productToEdit, category: value });
              }}
              categories={categories}
            />
            <div className="flex flex-wrap space-x-2 space-y-2 text-center my-3">
              {tempColors.concat(productToEdit.colors).map((color) => {
                return (
                  <span
                    key={color}
                    style={{ background: color }}
                    className="text-white p-1 rounded-md my-1 text-sm"
                  >
                    {color}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap space-x-2 space-y-2 text-center my-3">
              {renderProductColors}
            </div>
            {errMsg["colors"]
              ? tempColors.length <= 0 && (
                  <ErrorMessage msg={errMsg["colors"]} />
                )
              : null}

            <div className="flex justify-center items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                Submit
              </Button>
              <Button
                className="bg-gray-400 hover:bg-gray-500"
                onClick={() => {
                  cancel();
                }}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
        {/* // Remove Modal product // */}
        <Modal
          isOpen={isOpenDeleteModal}
          close={closeDeleteMoal}
          open={open}
          title="Destroy Product"
        >
          <form className="space-y-3" onSubmit={submitDeleteHandler}>
            <p>
              Are you sure that you want to delete{" "}
              <span className="font-bold">{productToDelete.title} </span>
              this will remove the product forever and you can't return it
            </p>
            <div className="flex justify-center items-center space-x-3">
              <Button className="bg-red-700 hover:bg-red-800">Yes</Button>
              <Button
                className="bg-gray-400 hover:bg-gray-500"
                onClick={() => {
                  closeDeleteMoal();
                }}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </>
  );
};

export default App;
