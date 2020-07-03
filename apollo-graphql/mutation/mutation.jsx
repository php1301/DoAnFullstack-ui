/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export const CREATE_HOTEL = gql`
    mutation CreateHotel($addHotelInput: AddHotelInput, $location: [LocationInput], $image: [ImageInput], $categories: CategoriesInput){
        createHotel(addHotelInput: $addHotelInput, location: $location, image: $image, categories: [$categories]){
            title
        }
    }
`;
export const LOGIN = gql`
    mutation Login($loginInput: LoginInput){
        login(loginInput: $loginInput){
            id
            email
            last_name
            first_name
            profile_pic_main
        }
    }
`;

export const SIGNUP = gql`
    mutation Signup($signUpInput:SignUpInput){
        signup(signUpInput: $signUpInput){
            id
            email
            last_name
            first_name
            profile_pic_main
        }
    }
`;

export const LIKE = gql`
    mutation LikeHotel($id: ID!){
        likeHotel(id:$id){
            title
            # id
            # peopleLiked
            # connectId
            # agentId
            # title
            # slug
            # status
            # content
            # price
            # isNegotiable
            # propertyType
            # condition
            # rating
            # ratingCount
            # contactNumber
            # termsAndCondition
            # amenities
            # image
            # location
            # gallery
            # categories
            # reviews
            # createdAt
            # updatedAt
        }
    }
`;
export const DISLIKE = gql`
    mutation DislikeHotel($id: ID!){
        dislikeHotel(id:$id){
            title
            # id
            # peopleLiked
            # connectId
            # agentId
            # title
            # slug
            # status
            # content
            # price
            # isNegotiable
            # propertyType
            # condition
            # rating
            # ratingCount
            # contactNumber
            # termsAndCondition
            # amenities
            # image
            # location
            # gallery
            # categories
            # reviews
            # createdAt
            # updatedAt
        }
    }
`;
