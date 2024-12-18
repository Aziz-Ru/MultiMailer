from rest_framework import serializers
from .models import GeneratedEmail,GeneratedReport

class Send_Email_Serializer(serializers.Serializer):
    emails=serializers.CharField(max_length=255)
    subject=serializers.CharField(max_length=255)
    body=serializers.CharField(max_length=10000)

class Email_Serializer(serializers.ModelSerializer):
    class Meta:
        model=GeneratedEmail
        fields=('id','user','subject','email')


class Report_Serializer(serializers.ModelSerializer):
    class Meta:
        model=GeneratedReport
        fields=('id','user','subject','report')
