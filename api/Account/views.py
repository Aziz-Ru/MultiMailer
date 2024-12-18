from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from Account.renders import Renderer_Error
from Account.serializers import *
from Account.models import User
# from utility import Utility

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class Register_View(APIView):
    renderer_classes=[Renderer_Error]
    def post(self,request):
        serializer=Register_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        token=get_tokens_for_user(user=user)
        return Response({'token':[token], 'status':status.HTTP_201_CREATED},status=status.HTTP_201_CREATED)


class Login_View(APIView):
    renderer_classes=[Renderer_Error]
    def post(self,request):
            serializer=Login_Serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            email=serializer.data.get('email')
            password=serializer.data.get('password')
            user=authenticate(email=email,password=password)
            if user is not None:
                token=get_tokens_for_user(user)
                return Response({'token':[token],'message':'Login Successfully'},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_fields_error':['Email or Password is Invalid']}},status=status.HTTP_400_BAD_REQUEST)
            

class Profile_View(APIView):
    renderer_classes=[Renderer_Error]
    permission_classes=[IsAuthenticated]
    def get(self,request,format=None):
        serializer=Profile_Serializer(request.user)
        return Response(serializer.data ,status=status.HTTP_200_OK)
    

class Password_Change_View(APIView):
    renderer_classes=[Renderer_Error]
    permission_classes=[IsAuthenticated] 
    
    def post(self,request):
        serializer=Password_Change_Serializer(data=request.data,context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'message':'Password Change Successfully'},status=status.HTTP_200_OK)
    

class Forget_Password_Sending_Email_View(APIView):
    renderer_classes=[Renderer_Error]
    
    def post(self,request):
        serializer=Password_Forget_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'message':'Check your email to reset password'},status=status.HTTP_200_OK)
        

class Password_Reset_View(APIView):
    renderer_classes=[Renderer_Error]
    def post(self,request,uid,token):
        serializer=Password_Reset_Serializer(data=request.data,context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'message':'Password Change Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
