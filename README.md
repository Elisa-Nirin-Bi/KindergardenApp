# KindergardenApp

# KindergardenApp

Models:

- User
- Child
- Payment
- News (for photo upload and news feed)
- Image
  Routes:
- Authentication - done
- Child x all crud operations:
- Create
  - child/create
- Read
  - child/:id
    -child/list
- Update
  -child/:id/edit
- Delete
  -child/:id/delete
- Images upload routes
- Messages routes x all crud operations
- Payments
  React Components:
- login - done
  Parent:
  Teacher: METHOD PATH DESCRIPTION
- main dashboard:
  - notifications
  - list child of her class
  - form to create child
  - child profile: - chat - form to update child - upload images, video, files - send news input
    Parent:
- child profile with different options (what if more than 1 kid?):
  - view images, video, news
  - download files, sign them and resend
  - they can approve requests
  - do payments (will all teachers see it?)
  - calendar
  - view weekly menu
    Cron Job for Payment
