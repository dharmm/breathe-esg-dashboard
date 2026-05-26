from rest_framework.views import APIView
from rest_framework.response import Response

from .models import EmissionRecord


class DashboardAPIView(APIView):

    def get(self, request):

        total_rows = EmissionRecord.objects.count()

        pending = EmissionRecord.objects.filter(
            status='PENDING'
        ).count()

        approved = EmissionRecord.objects.filter(
            status='APPROVED'
        ).count()

        flagged = EmissionRecord.objects.filter(
            suspicious=True
        ).count()

        total_co2e = sum(
            EmissionRecord.objects.values_list(
                'co2e',
                flat=True
            )
        )

        data = {
            'total_rows': total_rows,
            'pending_review': pending,
            'approved': approved,
            'flagged': flagged,
            'approved_kg_co2e': total_co2e,
        }

        return Response(data)


class EmissionListAPIView(APIView):

    def get(self, request):

        records = EmissionRecord.objects.all().values()

        return Response(records)

class ApproveEmissionAPIView(APIView):

    def post(self, request, pk):

        record = EmissionRecord.objects.get(id=pk)

        record.status = 'APPROVED'

        record.save()

        return Response({
            'message': 'Record Approved'
        })