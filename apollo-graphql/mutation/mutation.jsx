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
            cover_pic_main
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
            cover_pic_main
        }
    }
`;
export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword($password: UpdatePassword){
        updatePassword(password:$password){
            email
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

export const UPDATE_PROFILE = gql` 

    mutation UpdateProfile($profile: UpdateProfileInput, $location: LocationInput, $social: SocialInput){
    updateProfile(profile: $profile, location: $location, social: $social){
    first_name
    last_name
    date_of_birth
    gender
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
    social_profile {
      facebook
      linkedIn
      twitter
      instagram
    }
    cellNumber
    content
        }
    }
`;
export const UPDATE_PHOTOS = gql`
    mutation UpdatePhotos($photos: [UpdatePhotosInput]){
        updatePhotos(photos: $photos){
            email
            # profile_pic_main
            # cover_pic_main
        }
    }
`;
export const DELETE_PHOTOS = gql`
    mutation DeletePhotos($photos: [DeletePhotosInput]){
        deletePhotos(photos: $photos){
            email
        }
    }
`;
export const SET_PROFILE_PIC = gql`
    mutation SetProfilePic($url: String){
        setProfilePic(url: $url){
            email
        }
    }
`;
export const SET_COVER_PIC = gql`
    mutation SetCoverPic($url: String){
        setCoverPic(url: $url){
            email
        }
    }
`;
