import { ApiService } from "./constants/accessAPI";
import sanityClient from "./sanity";
let sanityQuery = (query, params) => sanityClient.fetch(query, params);

const apiService = new ApiService();

export const getFeaturedResturants = async () => {
  try {
    const data = await apiService.get("api/Orders/MenuList");
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const getCategories = () => {
  return sanityQuery(`
        *[_type == 'category']
    `);
};

export const getFeaturedResturantById = (id) => {
  return sanityQuery(
    `
        *[_type == 'featured' && _id == $id] {
            ...,
            resturants[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
            }
        }[0]
    `,
    { id }
  );
};
