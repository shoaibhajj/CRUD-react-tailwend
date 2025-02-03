/**
 * 
 * @param product - product object (  title: string;
  description: string;
  imageURL: string;
  price: string;)
 * @returns  error object     error massge if there any error with form parameters
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title =
      "Product Title must be at between 10 characters and 80 characters";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be at between 10 characters and 900 characters";
  }

  const isValidURL =
    /^(https?:\/\/)[^\s/?#]+(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#\S*)?$/i.test(
      product.imageURL
    );
  if (!product.imageURL.trim() || !isValidURL) {
    errors.imageURL = "Valid image URL is required";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid Price is required";
  }

  return errors;
};
