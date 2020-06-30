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
