import React from 'react';

interface Certificate {
  name: string;
  url?: string;
}

interface ProductCertificatesProps {
  certificates?: Certificate[];
}

const ProductCertificates: React.FC<ProductCertificatesProps> = ({
  certificates,
}) => {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-semibold text-foreground mb-3'>
        Certificates & Documentation
      </h2>
      {certificates && certificates.length > 0 ? (
        certificates.map((cert, i) => (
          <span key={i} className='text-syntara-light/80'>
            {cert.name}
            {i !== certificates.length - 1 && ', '}
          </span>
        ))
      ) : (
        <p className='text-syntara-light/80'>
          No certificates available for this product.
        </p>
      )}
    </div>
  );
};

export default ProductCertificates;
