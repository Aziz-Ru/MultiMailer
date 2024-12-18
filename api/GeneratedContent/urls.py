from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import Email_Viewset,Report_Viewset,Send_Email_View


router=DefaultRouter()
router.register('generated-email',Email_Viewset,basename='email')
router.register('generated-report',Report_Viewset,basename='report')
urlpatterns=[
    path('',include(router.urls)),
    path('send-mail/',Send_Email_View.as_view())
]