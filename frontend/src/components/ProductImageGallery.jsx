import React from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

class ProductImageGallery extends React.Component {
  render() {
    const { images, showPlayButton } = this.props; // Destructure the props

    return (
      <ImageGallery
        items={images}
        showPlayButton={showPlayButton}
        showNav={false}
        autoPlay={false}
        disableThumbnailScroll={false}
        useBrowserFullscreen={false}
        useTranslate3D={false}
      />
    );
  }
}

export default ProductImageGallery;
