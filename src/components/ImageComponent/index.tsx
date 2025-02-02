interface IProp {
    imgUrl: string;
    alt: string;
    className?: string;

}

const Image = ({imgUrl,alt,className}: IProp) => {
  return (
    <img
      src={imgUrl} 
      alt={alt}
      className={className}
    />
  );
}

export default  Image