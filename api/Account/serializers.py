from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from .utility import Utility

class Register_Serializer(serializers.ModelSerializer):

    password1=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    class Meta:
        model=User
        fields=("email","username","password","password1",)

    def validate(self,attrs):
        username=attrs.get('username')
        if username is None:
            raise serializers.ValidationError("Username must be required")

        password=attrs.get('password')
        password1=attrs.get('password1')
        tc=attrs.get('tc')
        if password1!=password:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        if tc==False:
            raise serializers.ValidationError('Terms & Condtion must be agree')
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password1')
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)
    

class Verify_Account_Serializer(serializers.Serializer):
    email=serializers.CharField(max_length=255)
    otp=serializers.CharField(max_length=6)

    def validate(self, attrs):
        email=attrs.get('email')
        otp=attrs.get('otp')
        user=User.objects.get(email=email)
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            if user.otp!=otp:
                raise serializers.ValidationError("You are send invalid otp")
            user.is_verified=True
            user.save()
            return attrs
        else:
            raise serializers.ValidationError('Invalid User')



class Login_Serializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=255)
    class Meta:
        model=User
        fields=('email','password')


class Profile_Serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('email','username',)

class Password_Change_Serializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password1=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    # class Meta:
    #     fields=('password','password1')

    def validate(self, attrs):
        password=attrs.get('password')
        confirm_password=attrs.get('password1')
        user=self.context.get('user')
        if password!=confirm_password:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs
    
class Password_Forget_Serializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255)
    def validate(self, attrs):
        email=attrs.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)  
            uid=urlsafe_base64_encode(force_bytes(user.id))
            token=PasswordResetTokenGenerator().make_token(user=user)
            link='http://localhost:3000/reset-password/'+uid+'/'+token
            #print(link)
            #Send Email Code Here
            body='Click Following Link to Reset Your Password '+link
            data={
                'subject':'Reset Your Password',
                'body':body,
                'to_email':user.email
            }

            Utility.send_email(data=data)
            # attrs['uid']=uid
            # attrs['token']=token
            # print(link)
            return attrs
        else:
            raise serializers.ValidationError("Invalid Email")


class Password_Reset_Serializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password1=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    # class Meta:
    #     fields=('password','password1')

    def validate(self, attrs):
        try:
            password=attrs.get('password')
            confirm_password=attrs.get('password1')
            uid=self.context.get('uid')
            token=self.context.get('token')
            if password!=confirm_password:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            id=smart_str(urlsafe_base64_decode(uid))
            user=User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user=user,token=token):
                raise serializers.ValidationError("Token is Invalid or Expired")
       
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError:
            PasswordResetTokenGenerator().check_token(user=user,token=token)
            raise serializers.ValidationError("Token is Invalid or Expired")
             
