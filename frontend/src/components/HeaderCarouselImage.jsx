const HeaderCarouselImage = ({ src, alt, text }) => {
  return (
    <div>
      <img src={src} alt={alt} />
      <p>{text}</p>
    </div>
  );
};

export default HeaderCarouselImage;
