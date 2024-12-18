from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from Account.renders import Renderer_Error
from .models import GeneratedEmail,GeneratedReport
from .serializers import Email_Serializer,Report_Serializer,Send_Email_Serializer
from .Pagination import Pagenumber

from django.core.mail import EmailMessage
import os

def send_email(data):
        to_email=data['to_email']
        to_emailList=to_email.split(',')
        email=EmailMessage(
            subject=data['subject'],
            body=data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            to=to_emailList
        )
        try:
            email.send()
            message="Successfully sent email"
        except Exception as e:
             message=f'f"Error sending email: {str(e)}"'
        
        return message

class Send_Email_View(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self,request):
        
        serializer=Send_Email_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data={
            'subject':serializer.data.get('subject'),
            'body':serializer.data.get('body'),
            'to_email':serializer.data.get('emails'),
        }
        message=send_email(data=data)
        return Response({'message':message})
        

class Email_Viewset(viewsets.ModelViewSet):

    permission_classes=[IsAuthenticated]
    renderer_classes=[Renderer_Error]
    pagination_class=Pagenumber
    serializer_class=Email_Serializer
    def get_queryset(self):
            user=self.request.user
            return GeneratedEmail.objects.filter(user=user)
    def create(self, request, *args, **kwargs):
         user=request.user
         request.data['user']=user.id
         serializer=self.get_serializer(data=request.data)
         serializer.is_valid(raise_exception=True)
         serializer.save()
         return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
         partial=kwargs.pop('partial',False)
         instance =self.get_object()
         if instance.user!=request.user:
               return Response({'message': 'Permission denied. You do not own this report.'}, status=status.HTTP_403_FORBIDDEN)
         request.data['user']=request.user.id
         serializer = self.get_serializer(instance, data=request.data, partial=partial)
         serializer.is_valid(raise_exception=True)
         serializer.save()
         return Response(serializer.data, status=status.HTTP_200_OK)   
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        request.data['user']=request.user.id
        return self.update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'message': 'Permission denied. You do not own this report.'}, status=status.HTTP_403_FORBIDDEN)

        instance.delete()
        return Response({'message': 'Deleted data successfully'}, status=status.HTTP_200_OK)
    

class Report_Viewset(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    renderer_classes=[Renderer_Error]
    pagination_class=Pagenumber
    serializer_class=Report_Serializer
    
    def get_queryset(self):
            user=self.request.user
            return GeneratedReport.objects.filter(user=user)
    def create(self, request, *args, **kwargs):
         user=request.user
         request.data['user']=user.id
         serializer=self.get_serializer(data=request.data)
         serializer.is_valid(raise_exception=True)
         serializer.save()
         return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
         partial=kwargs.pop('partial',False)
         instance =self.get_object()
         if instance.user!=request.user:
               return Response({'message': 'Permission denied. You do not own this report.'}, status=status.HTTP_403_FORBIDDEN)
         request.data['user']=request.user.id
         serializer = self.get_serializer(instance, data=request.data, partial=partial)
         serializer.is_valid(raise_exception=True)
         serializer.save()
         return Response(serializer.data, status=status.HTTP_200_OK)
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        request.data['user']=request.user.id
        return self.update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'message': 'Permission denied. You do not own this report.'}, status=status.HTTP_403_FORBIDDEN)

        instance.delete()
        return Response({'message': 'Deleted data successfully'}, status=status.HTTP_200_OK)
    

    

    
