from django.db import models
from emissions.models import EmissionRecord


class AuditLog(models.Model):

    emission_record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    action = models.CharField(max_length=255)

    changed_by = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)