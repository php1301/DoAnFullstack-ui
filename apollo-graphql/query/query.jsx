/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export const GET_USER_POSTS = gql`
  query GetUserPosts($uid: ID!) {
    userPosts(id: $uid) {
    favourite_post{
      id
    }
      listed_posts{
       id
      title
      content
      slug
      price
      status
      isNegotiable
      propertyType
      condition
      contactNumber
      termsAndCondition
      amenities{
        id
        guestRoom
        bedRoom
        wifiAvailability
        parkingAvailability
        poolAvailability
        airCondition
        extraBedFacility
      }
      location{
        id
        lat
        lng
        formattedAddress
        zipcode
        city
        state_long
        state_short
        country_long
        country_short
      }
      gallery{
        id
        url
      }
      categories{
        id
        slug
        name
        image
        {
          id
          url
        }
      }
      createdAt
      updatedAt
    }
  }
  }
`;
export const GET_HEART = gql`
  query FavouritePostsHeart($id: ID){
    favouritePostsHeart(id: $id){
      last_name
    }
  }
`;
export const GET_USER_INFO = gql`
query GetUserInfo($id: ID!){
  getUserInfo(id:$id){
    first_name
    last_name
    date_of_birth
    gender
    gallery{
      url
      uid
      id
    }
    agent_location {
      lat
      lng
      formattedAddress
      zipcode
      city
      state_long
      state_short
      country_long
      country_short
    }
    social_profile{
      facebook
      linkedIn
      twitter
      instagram
    }
    cellNumber
    content
    profile_pic_main
    cover_pic_main
  }
}
`;
