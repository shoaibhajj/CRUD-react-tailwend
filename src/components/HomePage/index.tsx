import Button from "../ui/Button";

interface IProp {
  open: (value: boolean) => void;
}

const HomePage = ({ open }: IProp) => {
  const handleScrollToProducts = () => {
    const productListDiv = document.getElementById("productList");
    if (productListDiv) productListDiv.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ height: "100vh" }} className="flex flex-col relative  ">
      <div className="flex justify-between items-center  ">
        <h5 className="font-semibold">Codeawy</h5>
        <div className="flex space-x-1">
          <Button
            className="bg-white font-semibold"
            style={{ color: "#000" }}
            onClick={handleScrollToProducts}
          >
            Products
          </Button>
          <Button
            className="bg-white flex-2 font-semibold"
            width="w-full"
            style={{ color: "#000" }}
            onClick={() => {
              open(true);
            }}
          >
            create a Product
          </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center ">
        <div className="flex flex-col items-center space-y-1 ">
          <h1 className="text-5xl font-semibold text-center">
            Learn ReactTs By
          </h1>

          <h1 className="text-5xl font-semibold text-center">Building</h1>

          <h1 className="text-5xl font-semibold text-indigo-600 text-center">
            Product Builder Project
          </h1>
          <p className="text-center text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ab itaque
            <br /> dolores sint harum numquam eius explicabo earum molestias
            quia!
          </p>
          <button
            className="bg-indigo-600 p-3 rounded-lg text-white my-3"
            onClick={() => {
              open(true);
            }}
          >
            Build now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
