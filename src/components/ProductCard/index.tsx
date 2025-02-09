import { IProduct } from "../../interfaces";
import { explainPrice, textSlicer } from "../../utils/functions";
import CircleColor from "../CircleColor";
import Image from "../ImageComponent";
import Button from "../ui/Button";

interface IProp {
  product: IProduct;
  idx: number;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setProductToEditIndex: (idx: number) => void;
  setProductToDelete: (product: IProduct) => void;
  openDeleteModal: () => void;
  setProductToDeleteIndex: (idx: number) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIndex,
  setProductToDeleteIndex,
  setProductToDelete,
  openDeleteModal,
}: IProp) => {
  const { imageURL, title, category, colors, description, price } = product;

  const renderProductColors = colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));

  // ** Handler ** //

  const onEdit = () => {
    setProductToEdit(product);
    setProductToEditIndex(idx);
    openEditModal();
  };

  const onDelete = () => {
    setProductToDelete(product);
    setProductToDeleteIndex(idx);
    openDeleteModal();
  };

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-300 rounded-md p-2 flex flex-col">
      <Image imgUrl={imageURL} alt="product name" className="rounded-md mb-2" />
      <h3 className="text-gray-900 font-semibold  ">{title}</h3>
      <p className="text-gray-500">{textSlicer(description, 70)}</p>
      <div className="flex flex-wrap space-x-2 space-y-2 text-center my-3">
        {renderProductColors}
      </div>
      <div className="flex justify-between text-center items-center">
        <span> ${explainPrice(price)}</span>
        <div className="flex items-center space-x-3">
          <p>{category.name}</p>
          <Image
            imgUrl={category.imageURL}
            alt="product name"
            className="w-10 h-10 rounded-full object-center"
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5 ">
        <Button
          onClick={() => {
            onEdit();
          }}
          className="bg-indigo-700"
          width="w-fit"
        >
          Edit
        </Button>
        <Button
          className="bg-red-700"
          onClick={() => {
            onDelete();
          }}
        >
          Destroy{" "}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
