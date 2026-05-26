from rest_framework import serializers
from .models import RawUpload


class RawUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = RawUpload
        fields = '__all__'