# Welcome to BookShelf!

Author: Josh Kaye.

This app will allow you to organize and view your personal book collection, as well as keep track of books you wish to buy. You will also be able to share your book collection and view others.

- Front-end : React
- Back-end : Laravel Sanctum
- External : Google Books API


## TYPICAL FEATURES STRUCTURE

- /api
- /components
- -- /largerSubComponent1
- -- /largerSubComponent2
- /hooks
- /services
- /validation

Each folder will contain these subfolders as needed.

## TYPICAL API STRUCTURE

### /api
- /getFeature
- /createFeature
- /postFeature
- /updateFeature
- /deleteFeature

Each file in /api should have 2 functions, named after request type. For example:
- useCreateFeature(props : CreateFeatureProps) : useQuery/useMutation
- async createFeature : validated Resource (not ReqResponse)

Each get request should be a useQuery. Other requests should be a useMutation, and invalidate the useQuery.

Each file in /api should have 1 interface for the Props


### /validation
- /createFeatureValidation
- /postFeatureValidation
- /updateFeatureValidation
- /deleteFeatureValidation

Each file should contain a validation schema, to be called in /api async function

### /hooks
- /useHandleCreateFeature
- /useHandlePostFeature
- /useHandleUpdateFeature
- /useHandleDeleteFeature

Each file should contain the hook for the Form onSubmit handler. The hook should return the handler and useQuery at minimum.

