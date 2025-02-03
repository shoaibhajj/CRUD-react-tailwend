import { IProduct } from "../../interfaces";
import { textSlicer } from "../../utils/functions";
import Image from "../ImageComponent";
import Button from "../ui/Button";

interface IProp {
  product: IProduct;
}

const ProductCard = ({ product }: IProp) => {
  const { imageURL, title, category, colors, description, price } = product;
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-300 rounded-md p-2 flex flex-col">
      <Image imgUrl={imageURL} alt="product name" className="rounded-md mb-2" />
      <h3 className="text-gray-900 font-semibold  ">{title}</h3>
      <p className="text-gray-500">{textSlicer(description, 70)}</p>
      <div className="flex space-x-3 text-center my-3">
        {colors.map((color, index) => (
          <span
            className={`w-5 h-5  rounded-full cursor-pointer`}
            style={{ background: color }}
            key={index}
          />
        ))}
      </div>
      <div className="flex justify-between text-center items-center">
        <span>${price}</span>
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
        <Button className="bg-indigo-700" width="w-fit">
          Edit
        </Button>
        <Button className="bg-red-700">Destroy </Button>
      </div>
    </div>
  );
};

export default ProductCard;
