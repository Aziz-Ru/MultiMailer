from django.db import models
from Account.models import User


class GeneratedEmail(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    subject=models.CharField(max_length=255)
    email=models.TextField()

    updated_at=models.DateTimeField(auto_now_add=True)
    created_at=models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.subject
    class Meta:
        ordering=['-updated_at','-created_at']
    
class GeneratedReport(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    subject=models.CharField(max_length=255)
    report=models.TextField()
    
    updated_at=models.DateTimeField(auto_now_add=True)
    created_at=models.DateTimeField(auto_now=True)


    def __str__(self) -> str:
        return self.subject
    class Meta:
        ordering=['-updated_at','-created_at']

