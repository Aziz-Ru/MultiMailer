from django.urls import path,include
from .views import *
urlpatterns = [
    path('sign-up/',Register_View.as_view()),
    path('sign-in/',Login_View.as_view()),
    path('profile/',Profile_View.as_view()),
    path('password-change/',Password_Change_View.as_view()),
    path('forget-password/',Forget_Password_Sending_Email_View.as_view()),
    path('reset-password/<uid>/<token>/',Password_Reset_View.as_view()),
    path('',include('GeneratedContent.urls'))
]
