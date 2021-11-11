Models
User
name - String
email - String
passwordHashAndSalt - String
role - String, either 'parent' or 'teacher'

Child
name- String
address - String
emergencyContactNumber - String
parent - ObjectId, refers to user document

Post
message - String not required
image - not not required
timestamp

AUTHENTICATION Routes

POST "/authentication/sign-up" Sign Up.
POST "/authentication/sign-in" Sign In.
PATCH ""/authentication/:id" Edit User Info
DELETE "/authentication/sign-out" Sign Out.

CHILD Routes

GET "/child/list" List kids
POST "/child/create" create kid
GET "/child/:id" find child
PATCH "/child/:id" edit child
DELETE "/child/:id" delete

Notification Routes

POST "/notification/create" to create notification
PATCH "/notification/:id" Edit notification
Delete "/notification/:id" Delete notification
GET "/notification/:id" Read notification

ENDPOINTS

CHILD
createChild => CREATE CHILD
editChild => EDIT CHILD
getAllChildreN => CHILDREN LIST
getChild => FIND CHILD PROFILE
removeChild => DELETE CHILD PROFILE

NOTIFICATION

createNotification => CREATE NOTIFICATION
editNotification => EDIT NOTIFICATION
getAllNotification => CHILDREN NOTIFICATION
getNotification => FIND NOTIFICATION
removeNotification => DELETE NOTIFICATION

Client-side
Views



PARENT
If the user is a parent, he sees a dashboard where he can access a form to create/edit child profile.
When he opens his child profile, he sees the teacher's notifications
Child name/address/contact number/parent name
DASHBOARD
EDIT CHILD FORM VIEW
CREATE CHILD FORM VIEW
CHILD PROFILE VIEW
PARENT PROFILE EDIT FORM VIEW

TEACHER

The teacher will see his dashboard where there a search input to search a child

Within the child profile, he will have a form to create/edit notifications
The teacher has a form to modify his own profile
The teacher will also have the notifications in each kid profile
The teacher can see all the kids list

DASHBOARD
EDIT NOTIFICATION FORM VIEW
CREATE NOTIFICATION FORM VIEW
CHILD NOTIFICATION VIEW
TEACHER PROFILE EDIT FORM VIEW

Wishlist:

1. Comments to teachers notifications
   2)Chat
   2)Subscriptions
   3)Kid Image Profile
   3)Drivers
