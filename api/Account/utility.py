from django.core.mail import EmailMessage
import os
import random
from .models import User

class Utility:
    @staticmethod
    
    def send_email(data):
        to_email=data['to_email']
        to_emailList=to_email.split(',')
        email=EmailMessage(
            subject=data['subject'],
            body=data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            to=to_emailList
        )
        email.send()
    


    def send_otp_to_email(context):
        otp=random.randint(1000,9999)
        subject="Account Verification on AbdulAziz.com"
        username=context.get('username')
        email_address=context.get('email')
        print(email_address)
        print(otp)
        email=EmailMessage(
            subject=subject,
            body=f"Hey {username}, Your OTP is {otp}. Please verify Your Account",
            from_email=os.environ.get('EMAIL_FROM'),
            to=[email_address]
        )
        email.send()
        try:
            user = User.objects.get(email=email_address)
            user.otp = otp
            print(user.otp)
            user.save()
        except User.DoesNotExist:
            # Handle the case where the user does not exist
            print("User does not exist")
