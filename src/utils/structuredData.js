// Structured Data Utilities for SEO
// These functions generate JSON-LD structured data for better search engine visibility

/**
 * Generates LocalBusiness structured data for BenFresh
 * @returns {Object} JSON-LD structured data object
 */
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "BenFresh Reinigung",
    "image": "https://benfresh.de/images/logo.png", // Update with actual logo path
    "url": "https://benfresh.de",
    "telephone": "+491761115432",
    "email": "info@benfresh.de",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Musterstraße 123",
      "addressLocality": "Köln",
      "postalCode": "50667",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.9375, // Update with actual coordinates
      "longitude": 6.9603  // Update with actual coordinates
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€€",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 50.9375,
        "longitude": 6.9603
      },
      "geoRadius": "30000" // 30km radius around Cologne
    },
    "sameAs": [
      "https://www.facebook.com/benfresh", // Update with actual social media URLs
      "https://www.instagram.com/benfresh"
    ]
  };
};

/**
 * Generates Review structured data
 * @param {Array} reviews - Array of review objects with author, rating, and reviewBody
 * @returns {Object} JSON-LD structured data object
 */
export const generateReviewSchema = (reviews) => {
  return {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "BenFresh Reinigung",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9", // Calculate from actual reviews
      "reviewCount": "200" // Update with actual count
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "reviewBody": review.reviewBody
    }))
  };
};

/**
 * Generates Service structured data for each service offered
 * @returns {Array} Array of service schema objects
 */
export const generateServicesSchema = () => {
  const services = [
    {
      name: "Grundreinigung",
      description: "Gründliche Reinigung für ein rundum sauberes Zuhause oder Büro."
    },
    {
      name: "Fensterreinigung",
      description: "Streifenfreie Fenster mit professionellen Methoden."
    },
    {
      name: "Teppichreinigung",
      description: "Tiefenreinigung für Teppiche und Polster."
    },
    {
      name: "Bodenreinigung",
      description: "Professionelle Pflege für Hartböden, Fliesen, Laminat und mehr."
    },
    {
      name: "Gemeinschaftsräume",
      description: "Zuverlässige Reinigung von Treppenhäusern, Fluren und Gemeinschaftsbereichen."
    },
    {
      name: "Büroreinigung",
      description: "Professionelle Reinigung von Büroflächen und Arbeitsplätzen."
    }
  ];

  return services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "CleaningService",
      "name": "BenFresh Reinigung"
    },
    "areaServed": {
      "@type": "City",
      "name": "Köln"
    },
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 50.9375,
          "longitude": 6.9603
        },
        "geoRadius": "30000"
      }
    }
  }));
};

/**
 * Creates a script element with the JSON-LD structured data
 * @param {Object} data - The structured data object
 * @returns {string} HTML script tag with structured data
 */
export const createJsonLdScript = (data) => {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
};
