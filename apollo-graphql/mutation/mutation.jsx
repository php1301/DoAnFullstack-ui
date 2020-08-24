/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export const CREATE_HOTEL = gql`
    mutation CreateHotel($addHotelInput: AddHotelInput, $location: [LocationInput], $image: [ImageInput], $categories: CategoriesInput){
        createHotel(addHotelInput: $addHotelInput, location: $location, image: $image, categories: [$categories]){
            id
            slug
        }
    }
`;
export const SORT_HOTEL = gql`
       mutation SortHotel($type: String){
            sortHotel(type: $type){
                price
            }
        }
`;
export const FILTER_HOTELS = gql`
    mutation FilterHotels{
        filterHotels{
                price
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
            role
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
            role
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
export const SEND_CONTACT = gql`
mutation SendContact($contact: ContactInput){
    sendContact(contact: $contact){
        email
    }
}
`;
export const MAKE_REVIEWS = gql`
  mutation MakeReviews($reviews: ReviewInput, $hotelId: ID){
    makeReviews(reviews: $reviews, hotelId: $hotelId){
        title
    }
  }
`;
export const LIKE_OR_DISLIKE_REVIEW = gql`
    mutation LikeOrDislikeReview($id: ID!, $type: Int){
        likeOrDislikeReview(id:$id, type: $type){
            reviewTitle
        }
    }
`;

export const CHECK_NOTIFICATION = gql`
    mutation CheckNotification($id: ID!){
        checkNotification(id:$id){
            id
        }
    }
`;
export const DELETE_ALL_NOTIFICATIONS = gql`
    mutation DeleteAllNotifications($id: ID!){
        deleteAllNotifications(id: $id){
            profile_pic_main
        }
    }
`;
export const READ_NOTIFICATION = gql`
    mutation ReadNotification($query: String){
        readNotification(query: $query){
            profile_pic_main
        }
    }
`;

export const CREATE_TRANSACTION = gql`
    mutation  CreateTransaction($transaction: TransactionInput, $hotelId: String, $userId: String, $coupon: CouponCheckedPayload){
    createTransaction(transaction: $transaction, hotelId: $hotelId, userId: $userId, coupon: $coupon)
        {
            TXID
            transactionSecretKey
        }
    }
`;
export const PROCESS_TRANSACTION = gql`
    mutation ProcessTransactions($id: [String], $type: Int){
        processTransactions(id: $id, type: $type){
            transactionAuthorNote
        }
    }
`;
export const UPDATE_TOTAL_UNREAD_TRANSACTIONS = gql`
    mutation UpdateTotalUnreadTransactions {
        updateTotalUnreadTransactions{
            content
        }
    }
`;
export const CREATE_COUPON = gql`
    mutation CreateCoupon($coupon: CouponInput, $hotelsId: [String], $type: Int){
        createCoupon(coupon: $coupon, hotelsId: $hotelsId, type: $type){
            couponQuantity
        }
    }
`;
export const CHECK_COUPON = gql`
    mutation CheckCoupon($hotelId: String, $couponName: String){
        checkCoupon(hotelId: $hotelId, couponName: $couponName){
            couponQuantity
            couponName
            couponId
            couponType
            couponValue
        }
    }
`;
export const DELETE_COUPONS = gql`
    mutation DeleteCoupons($id: [String]){
        deleteCoupons(id: $id){
            couponQuantity
        }
    }
`;

export const UPDATE_STRIPE_ID = gql`
    mutation UpdateStripeId($stripeId: String, $type: String){
        updateStripeId(stripeId: $stripeId, type: $type){
            content
        }
    }
`;
