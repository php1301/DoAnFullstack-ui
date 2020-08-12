/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export const UNREAD_NOTIFICATION = gql`
    subscription UnreadNotification($channelId: String){
        unreadNotification(channelId: $channelId){
            unreadNotification
        }
    }
`;
export const NOTIFICATION_BELL = gql`
    subscription NotificationBell($channelId: String){
        notificationBell(channelId: $channelId) {
            peopleReviewedQuantity
            reviewAuthorName
            query
            reviewTitle
            read
            reviewText
            reviewedHotelName
            reviewAuthorProfilePic
        }
    }
`;
export const REALTIME_REVIEWS = gql`
    subscription RealtimeReviews($hotelId: String){
        realtimeReviews(hotelId: $hotelId){
        reviewID
        reviewTitle
        reviewText
        sortOfTrip
        reviewAuthorId{
          id
        }
        reviewAuthorFirstName
        reviewAuthorLastName
        reviewAuthorEmail
        reviewOverall
        reviewAuthorPic
        reviewedHotelId
        reviewTips
        reviewPics{
           url
        }
        reviewDate
        reviewOptional{
          option 
          optionField
        }
        reviewFields{
            rating 
            ratingFieldName
          }
    }
}
`;
export const REALTIME_LIKE_DISLIKE = gql`
    subscription RealtimeLikeDislike($reviewID: String){
        realtimeLikeDislike(reviewID: $reviewID){
            reviewID
            peopleLiked{
                id
            }
            peopleDisliked{
                id
            }
        }
    }
`;
