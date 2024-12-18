from django.contrib import admin
from .models import GeneratedReport,GeneratedEmail

admin.site.register(GeneratedEmail)
admin.site.register(GeneratedReport)
