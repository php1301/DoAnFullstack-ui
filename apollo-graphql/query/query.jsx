/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export const GET_PROFILE_OF_CURRENT_USER = gql`
  query GetProfile($uid: ID!) {
    user(uid: $uid) {
      uid
      name
      username
      avatar
      cover_photo
      posts {
        id
        type
        thumb_url
        numberOflike
        numberOfcomment
        gallery
        video
        comments {
          id
          role
          username
          avatar
          comment
        }
      }
      followers {
        id
        name
        avatar
      }
      following {
        id
        name
        avatar
      }
    }
  }
`;
