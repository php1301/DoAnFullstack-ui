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
            peopleReviewedQuanity
            reviewAuthorName
            reviewTitle
            reviewText
            reviewedAuthorId
            reviewedHotelName

  }
    }
`;
