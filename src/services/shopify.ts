import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    credentials: 'include',
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    },
  }),
  cache: new InMemoryCache(),
})

// ========================================
// QUERIES
// ========================================

export const PRODUCTS_QUERY = gql`
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          handle
          title
          description
          vendor
          productType
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                sku
                barcode
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          options {
            id
            name
            values
          }
        }
      }
    }
  }
`

export const PRODUCT_QUERY = gql`
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      vendor
      productType
      images(first: 20) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            sku
            barcode
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            image {
              url
              altText
              width
              height
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        id
        name
        values
      }
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
`

export const COLLECTIONS_QUERY = gql`
  query GetCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 12) {
            edges {
              node {
                id
                handle
                title
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

// ========================================
// MUTATIONS
// ========================================

export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

// ========================================
// SERVICE FUNCTIONS
// ========================================

export async function getProducts(first: number = 12, after?: string) {
  try {
    const result = await client.query({
      query: PRODUCTS_QUERY,
      variables: { first, after },
    })
    return result.data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getProduct(handle: string) {
  try {
    const result = await client.query({
      query: PRODUCT_QUERY,
      variables: { handle },
    })
    return result.data.productByHandle
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export async function getCollections(first: number = 12, after?: string) {
  try {
    const result = await client.query({
      query: COLLECTIONS_QUERY,
      variables: { first, after },
    })
    return result.data.collections
  } catch (error) {
    console.error('Error fetching collections:', error)
    throw error
  }
}
