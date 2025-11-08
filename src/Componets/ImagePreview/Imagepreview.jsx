import React, { useState } from 'react';
import { Button, Image } from 'antd';

const ImagePreview = ({ image }) => {
  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)} className='mt-2'>
        Show Image Preview
      </Button>

      <Image
        src={image}
        width={200}
        preview={{
          visible,
          scaleStep,
          src: image, // Correct usage
          onVisibleChange: (value) => setVisible(value),
        }}
        style={{ display: 'none',  }} // Keep hidden in the DOM if needed
      />
    </div>
  );
};

export default ImagePreview;
