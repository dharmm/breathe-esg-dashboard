from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import DataSource, RawUpload

admin.site.register(DataSource)
admin.site.register(RawUpload)