import React from 'react';
import { Helmet } from 'react-helmet-async';
import { absoluteSiteUrl, getDefaultOgImageUrl, getSiteUrl } from '../lib/siteUrl';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schemaData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'drum and bass, UK garage, musica elettronica, bass music, eventi musicali, La Caletta, Siniscola, Sardegna, Italia',
  image,
  url,
  type = 'website',
  schemaData,
}) => {
  const siteName = 'Take a Break';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = getSiteUrl();
  const fullUrl = url ? absoluteSiteUrl(url) : `${baseUrl}/`;
  const defaultOg = getDefaultOgImageUrl();
  const fullImage = image ? absoluteSiteUrl(image) : defaultOg;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:locale:alternate" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
